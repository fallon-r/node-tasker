const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../../src/models/user");
const Task = require("../../src/models/tasks");
require("dotenv").config();

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
  _id: userOneId,
  name: "Ryan",
  email: "ryan@example.com",
  password: "passyworddy123",
  tokens: [
    {
      token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET),
    },
  ],
};
const userTwoId = new mongoose.Types.ObjectId();
const userTwo = {
  _id: userTwoId,
  name: "Not Ryan",
  email: "notryan@example.com",
  password: "passyworddy123",
  tokens: [
    {
      token: jwt.sign({ _id: userTwoId }, process.env.JWT_SECRET),
    },
  ],
};

const taskOne = {
  _id: new mongoose.Types.ObjectId(),
  description: "first task",
  completed: false,
  owner: userOneId,
};
const taskTwo = {
  _id: new mongoose.Types.ObjectId(),
  description: "Second task",
  completed: false,
  owner: userOneId,
};
const taskThree = {
  _id: new mongoose.Types.ObjectId(),
  description: "Third task",
  completed: false,
  owner: userTwoId,
};

const setUpDatabase = async () => {
  await User.deleteMany();
  await Task.deleteMany();
  await new User(userOne).save();
  await new User(userTwo).save();
  await new Task(taskOne).save();
  await new Task(taskTwo).save();
  await new Task(taskThree).save();
};

module.exports = {
  userOneId,
  userOne,
  setUpDatabase,
  taskThree,
};
