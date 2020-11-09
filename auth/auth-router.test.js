const supertest = require("supertest");
const server = require("../api/server");
const db = require("../database/dbConfig");

beforeAll(async () => {
  await db("users").truncate();
});

afterAll(async () => {
  await db.destroy();
});

describe("tests for /api/auth/register endpoint", () => {
  it("adds user correctly", async () => {
    const res = await supertest(server)
      .post("/api/auth/register")
      .send({ username: "johndoe", password: "abc123" });
    expect(res.statusCode).toBe(201);
    expect(res.type).toBe("application/json");
    expect(res.body.username).toBe("johndoe");
    expect(res.body.id).toBeDefined();
  });
  it("username/password undefined", async () => {
    const res = await supertest(server)
      .post("/api/auth/register")
      .send({ username: "", password: "" });
    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe("Username and Password required.");
  });
});

describe("tests for /api/auth/login endpoint", () => {
  it("logs user in successfully", async () => {
    const res = await supertest(server)
      .post("/api/auth/login")
      .send({ username: "johndoe", password: "abc123" });
    expect(res.statusCode).toBe(200);
    expect(res.type).toBe("application/json");
    expect(res.body.message).toBe("Welcome, johndoe!");
  });
  it("username/password undefined", async () => {
    const res = await supertest(server)
      .post("/api/auth/login")
      .send({ username: "", password: "" });
    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe("Username and Password required.");
  });
});
