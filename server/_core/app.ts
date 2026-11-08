import "dotenv/config";
import express from "express";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { publicPlatformScript } from "./publicConfig";
import { notifyClientEmail, notifyOwner } from "./notification";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { registerStorageProxy } from "./storageProxy";
import { z } from "zod";
import { ENV } from "./env";

const optionalText = (max: number) => z.string().trim().max(max).optional().default("");
const inquirySchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(320),
  projectType: z.enum(["commercial", "residential"]),
  service: z.string().trim().min(1).max(160),
  description: z.string().trim().min(1).max(4000),
  company: optionalText(160), phone: optionalText(40),
  projectLocation: optionalText(200), timeline: optionalText(120),
  website: optionalText(200),
});

export const app = express();
  app.use("/api/inquiry", express.json({ limit: "16kb" }));
  app.use("/api/inquiry", express.urlencoded({ limit: "16kb", extended: false }));
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  app.get("/api/health", (_req, res) => res.json({ status: "ok" }));
  app.get("/api/inquiry/status", (_req, res) => {
    res.set("Cache-Control", "no-store").json({ configured: Boolean(ENV.resendApiKey && ENV.resendFromEmail) });
  });
  app.get("/api/platform/config.js", (_req, res) => {
    res.set("Cache-Control", "no-store").type("application/javascript").send(publicPlatformScript());
  });
  app.post("/api/inquiry", async (req, res) => {
    const parsed = inquirySchema.safeParse(req.body);
    if (!parsed.success || parsed.data.website) return res.status(400).json({ error: "Please check the required fields and try again." });
    const values = parsed.data;
    try {
      const notification = {
        title: `New 5280 Frame & Drywall estimate request from ${values.name.replace(/[\r\n]/g, " ")}`,
        content: [
          `Name: ${values.name}`,
          `Company: ${values.company}`,
          `Phone: ${values.phone}`,
          `Email: ${values.email}`,
          `Project location: ${values.projectLocation}`,
          `Timeline: ${values.timeline}`,
          `Project type: ${values.projectType}`,
          `Service needed: ${values.service}`,
          "",
          "Project description:",
          values.description,
        ].join("\n"),
      };
      const [ownerResult, clientEmailResult] = await Promise.allSettled([
        notifyOwner(notification),
        notifyClientEmail({ ...notification, replyTo: values.email }),
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
