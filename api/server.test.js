const supertest = require("supertest");
const server = require("../api/server");

test("GET /", async () => {
  const res = await supertest(server).get("/");
  expect(res.body.message).toBe("Hello, world!");
});
