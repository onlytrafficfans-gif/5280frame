import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import type { Server } from "node:http";

const mocks = vi.hoisted(() => ({ owner: vi.fn(), email: vi.fn() }));
vi.mock("./_core/notification", () => ({ notifyOwner: mocks.owner, notifyClientEmail: mocks.email }));
import { app } from "./_core/app";

let server: Server;
let url: string;
const inquiry = { name: "Test contractor", email: "contractor@example.com", projectType: "commercial", service: "Commercial metal framing", description: "Office interior", company: "Example Co", projectLocation: "Colorado", timeline: "Spring", phone: "" };

beforeAll(async () => {
  await new Promise<void>(resolve => { server = app.listen(0, "127.0.0.1", resolve); });
  const address = server.address();
  if (!address || typeof address === "string") throw new Error("Test server unavailable");
  url = `http://127.0.0.1:${address.port}/api/inquiry`;
});
afterAll(() => new Promise<void>(resolve => server.close(() => resolve())));
beforeEach(() => { vi.clearAllMocks(); mocks.owner.mockResolvedValue(false); mocks.email.mockResolvedValue(true); });

describe("commercial inquiry", () => {
  it("reports configuration status without exposing credentials", async () => {
    const response = await fetch(`${url}/status`);
    const body = await response.json();
    expect(response.status).toBe(200);
    expect(Object.keys(body)).toEqual(["configured"]);
    expect(typeof body.configured).toBe("boolean");
  });
  it("validates a request and forwards its project details and reply address", async () => {
    const response = await fetch(url, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(inquiry) });
    expect(response.status).toBe(201);
    expect(mocks.email).toHaveBeenCalledWith(expect.objectContaining({ replyTo: inquiry.email, content: expect.stringContaining("Company: Example Co") }));
  });
  it("accepts a residential project and includes its type in the inquiry", async () => {
    const response = await fetch(url, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ ...inquiry, projectType: "residential" }) });
    expect(response.status).toBe(201);
    expect(mocks.email).toHaveBeenCalledWith(expect.objectContaining({ content: expect.stringContaining("Project type: residential") }));
  });
  it("rejects invalid email and honeypot entries without sending", async () => {
    for (const body of [{ ...inquiry, email: "not-an-email" }, { ...inquiry, website: "spam" }]) {
      const response = await fetch(url, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });
      expect(response.status).toBe(400);
    }
    expect(mocks.email).not.toHaveBeenCalled();
  });
  it("rejects an oversized request without sending", async () => {
    const response = await fetch(url, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ ...inquiry, description: "x".repeat(20000) }) });
    expect(response.status).toBe(413);
    expect(mocks.email).not.toHaveBeenCalled();
  });
  it("reports failure when email delivery was not accepted", async () => {
    mocks.email.mockResolvedValue(false);
    const response = await fetch(url, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(inquiry) });
    expect(response.status).toBe(503);
    expect(await response.json()).not.toHaveProperty("ok", true);
  });
});
