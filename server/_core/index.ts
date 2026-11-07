import "dotenv/config";
import express from "express";
import { createServer } from "http";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { publicPlatformScript } from "./publicConfig";
import { notifyClientEmail, notifyOwner } from "./notification";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { registerStorageProxy } from "./storageProxy";
import { serveStatic, setupVite } from "./vite";

const clean = (value: unknown) => typeof value === "string" ? value.trim() : "";

async function startServer() {
  const app = express();
  const server = createServer(app);
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  app.get("/api/health", (_req, res) => res.json({ status: "ok" }));
  app.get("/api/platform/config.js", (_req, res) => {
    res.set("Cache-Control", "no-store").type("application/javascript").send(publicPlatformScript());
  });
  app.post("/api/inquiry", async (req, res) => {
    const { name, phone, email, projectType, service, description, website } = req.body ?? {};
    if (website) return res.status(400).json({ error: "Invalid submission." });
    const values = { name: clean(name), phone: clean(phone), email: clean(email), projectType: clean(projectType), service: clean(service), description: clean(description) };
    if ([values.name, values.email, values.projectType, values.service, values.description].some((value) => !value)) return res.status(400).json({ error: "Please complete all required fields." });
    if (values.name.length > 120 || values.email.length > 320 || values.description.length > 4000) return res.status(400).json({ error: "One or more fields are too long." });
    try {
      const notification = {
        title: `New 5280 Frame & Drywall estimate request from ${values.name}`,
        content: [
          `Name: ${values.name}`,
          `Phone: ${values.phone}`,
          `Email: ${values.email}`,
          `Project type: ${values.projectType}`,
          `Service needed: ${values.service}`,
          "",
          "Project description:",
          values.description,
        ].join("\n"),
      };
      const [ownerResult, clientEmailResult] = await Promise.allSettled([
        notifyOwner(notification),
        notifyClientEmail(notification),
      ]);
      const ownerDelivered = ownerResult.status === "fulfilled" && ownerResult.value;
      const clientEmailDelivered = clientEmailResult.status === "fulfilled" && clientEmailResult.value;
      if (!ownerDelivered) console.warn("[Inquiry] Owner notification was not delivered.");
      if (!clientEmailDelivered) return res.status(503).json({ error: "The client email notification is temporarily unavailable." });
      return res.status(201).json({ ok: true });
    } catch (error) {
      console.error("[Inquiry] Submission failed:", error);
      return res.status(503).json({ error: "The inquiry service is temporarily unavailable." });
    }
  });
  registerStorageProxy(app);
  registerOAuthRoutes(app);
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = Number(process.env.PORT || "3000");
  if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error("Invalid PORT");
  server.on("error", error => { console.error("Server failed:", error.message); process.exit(1); });
  server.listen(port, "0.0.0.0", () => console.log(`Server listening on port ${port}`));
}

startServer().catch(error => { console.error(error); process.exit(1); });
