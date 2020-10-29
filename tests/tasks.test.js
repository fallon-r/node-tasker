const request = require("supertest");
const app = require("../src/app");
const Task = require("../src/models/tasks");
const { userOneId, userOne, setUpDatabase } = require("./fixtures/db");
require("dotenv").config();

beforeEach(setUpDatabase);

test("Should Create user task", async () => {
  const reesponse = await request(app)
    .post("/tasks")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      description: "From My Test",
    })
    .expect(201);

  const task = await Task.findById(response.body.id);
  expect(task).not.toBeNull();
  expect(task.completed).toEqual(false);
});
