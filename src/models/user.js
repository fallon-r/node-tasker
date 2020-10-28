const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Task = require("./tasks");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("That's not a valid email.");
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 7,
      validate(value) {
        if (validator.contains(value, "password", { ignoreCase: true })) {
          throw new Error("Password can't be password");
        }
      },
    },
    age: {
      type: Number,
      default: 0,
      validate(value) {
        if (value < 0) {
          throw new Error("Age must be a positive number");
        }
      },
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
    avatar: {
      type: Buffer
    }
  },
  {
    timestamps: true,
  }
);

// *Virtual Attribute
userSchema.virtual("tasks", {
  ref: "Task",
  localField: "_id",
  foreignField: "owner",
});

// * Auth Token

userSchema.methods.generateAuthToken = async function () {
  // * this = user

  const token = await jwt.sign(
    { _id: this._id.toString() },
    "aseriesofcharacters"
  );

  this.tokens = this.tokens.concat({ token });
  await this.save();
  return token;
};

// * Validates

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Cannot login");
  }
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Cannot login");
  }
  return user;
};

// * Hashes plain text pw before save
userSchema.pre("save", async function (next) {
  console.log("hashing");
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }

  next();
});

// * Delete User and tasks
userSchema.pre("remove", async function (next) {
  // ?this is user
  await Task.deleteMany({ owner: this._id });
  next();
});

// * Public Profile

userSchema.methods.toJSON = function () {
  // ?This is user

  const userObject = this.toObject();

  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
