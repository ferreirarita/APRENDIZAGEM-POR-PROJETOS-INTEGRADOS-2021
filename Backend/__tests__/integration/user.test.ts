import request from "supertest";
import app from "../../src/app";
import connection from "../../src/database/connection";
import User from "../../src/models/User";

describe("Test the app routes", () => {
  test("should execute the root route", async () => {
    const res = await request(app).get("/api/");

    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty("message");
  });

  test("should return an array", async () => {
    const res = await request(app).get("/api/user");

    expect(res.status).toEqual(200);
  });

  test("should create a new user", async () => {
    const user = await User.query().insert({
      name: "Jane Doe",
      email: "jane@doe.com",
    });

    expect(user.name).toBe("Jane Doe");
  });

  test("should update an user", async () => {
    const user = await User.query().where("id", 1).update({
      name: "Jane Doe",
      email: "jane@doe.com",
    });

    expect(user).toBe(1);
  });

  test("should delete an user", async () => {
    const user = await User.query().where("id", 1).del();

    expect(user).toBe(1);
  });
});

afterAll(async (done) => {
  connection.destroy();
  done();
});
