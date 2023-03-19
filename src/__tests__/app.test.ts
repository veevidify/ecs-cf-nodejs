import { app } from "../app";
import httpTest from "supertest";

describe("server", () => {
  describe("app", () => {
    test("have registered endpoints", async () => {
      await httpTest(app).get("/api").expect(200);
      await httpTest(app).get("/api/ping").expect(200);
    });
  });
});
