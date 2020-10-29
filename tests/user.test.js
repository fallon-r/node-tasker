const request = require("supertest");
const { userOne, userOneId, setUpDatabase } = require("./fixtures/db");
const app = require("../src/app");
const User = require("../src/models/user");
require("dotenv").config();

beforeEach(setUpDatabase);

test("Should sign up a new user", async () => {
  const response = await request(app)
    .post("/users")
    .send({
      name: "Ryan",
      email: "ryan@aol.com",
      password: "dummypass123",
    })
    .expect(201);

  const user = await User.findById(response.body.user._id);
  expect(user).not.toBeNull();

  expect(response.body).toMatchObject({
    user: {
      name: "Ryan",
      email: "ryan@aol.com",
    },
  });

  expect(user.password).not.toBe("dummypass123");
});

test("Should log in existing user", async () => {
  const response = await request(app)
    .post("/users/login")
    .send({
      email: userOne.email,
      password: userOne.password,
    })
    .expect(200);
  const user = await User.findById(userOneId);

  expect(response.body.token).toBe(user.tokens[1].token);
});

test("Should NOT log in existing user", async () => {
  await request(app)
    .post("/users/login")
    .send({
      email: "wrong@email.com",
      password: "wrongpass1234",
    })
    .expect(400);
});

test("Should get u profile", async () => {
  await request(app)
    .get("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test("Should NOT get u profile", async () => {
  await request(app).get("/users/me").send().expect(401);
});

test("Should delete profile", async () => {
  await request(app)
    .delete("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);

  const user = await User.findById(userOneId);

  expect(user).toBeNull();
});

test("Should not delete profile", async () => {
  await request(app).delete("/users/me").send().expect(401);
});

test("Should upload avatar", async () => {
  await request(app)
    .post("/users/me/avatar")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .attach("avatar", "tests/fixtures/evil-patrick.jpg")
    .expect(200);

  const user = await User.findById(userOneId);
  expect(user.avatar).toEqual(expect.any(Buffer));
});

test("Should update valid user field", async () => {
  await request(app)
    .patch("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      name: "Reginald",
    })
    .expect(200);

  const user = await User.findById(userOneId);
  expect(user.name).toEqual("Reginald");
});

test("Should not update invalid user field", async () => {
  await request(app)
    .patch("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      location: "panama",
    })

    .expect(400);
});
