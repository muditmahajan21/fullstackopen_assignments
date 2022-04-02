const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const User = require("../models/user");
const bcrypt = require("bcrypt");

describe("When there is initially only a single user in the Database", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("secret", 10);
    const user = new User({
      userName: "root",
      passwordHash,
    });

    await user.save();
  });

  test("creation of a single user is successful", async () => {
    const responseBefore = await User.find({});
    const allUsersBefore = responseBefore.map((r) => r.toJSON());

    const newUser = {
      username: "stand_alone21",
      name: "Mudit Mahajan",
      password: "password",
    };

    await api.post("/api/users").send(newUser).expect(200);

    const responseAfter = await User.find({});
    const allUsersAfter = responseAfter.map((r) => r.toJSON());

    expect(allUsersAfter).toHaveLength(allUsersBefore.length + 1);

    const alluserNames = allUsersAfter.map((r) => r.userName);
    expect(alluserNames).toContain(newUser.userName);
  });

  test("If userName already exists, retuns proper status code", async () => {
    const responseBefore = await User.find({});
    const allUsersBefore = responseBefore.map((r) => r.toJSON());

    const newUser = {
      userName: "root",
      name: "root",
      password: "secret",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", "application/json; charset=utf-8");

    expect(result.body.error).toContain("username must be unique");

    const responseAfter = await User.find({});
    const allUsersAfter = responseAfter.map((r) => r.toJSON());

    expect(allUsersAfter).toEqual(allUsersBefore);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
