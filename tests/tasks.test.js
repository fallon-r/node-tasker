const request = require("supertest");
const app = require("../src/app");
const Task = require("../src/models/tasks");
const {
  userOneId,
  userOne,
  setUpDatabase,
  taskThree,
} = require("./fixtures/db");
require("dotenv").config();

beforeEach(setUpDatabase);

test("Should Create user task", async () => {
  const response = await request(app)
    .post("/tasks")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      description: "From My Test",
    })
    .expect(201);

  const task = await Task.findById(response.body._id);
  expect(task).not.toBeNull();
  expect(task.completed).toEqual(false);
});

test("Should get user task", async () => {
  const response = await request(app)
    .get("/tasks")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      description: "From My Test",
    })
    .send()
    .expect(200);

  expect(response.body.length).toEqual(2);
});

test("Should NOT delete other user task", async () => {
  const response = await request(app)
    .delete(`/tasks/${taskThree._id}`)
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(404);

  const tThree = await Task.findById(taskThree._id);
  expect(tThree).not.toBeNull();
});
