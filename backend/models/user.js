import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    match: [/^\S+@\S+\.\S+$/, "Please use a valid email address."],
  },
  password: {
    type: String,
    required: true,
  },
  status: {
    type: Number,
  },
  createdDate: { type: Date, default: Date.now },
  updateDate: { type: Date, default: Date.now },
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});
userSchema.methods.checkPassword = async function (password) {
  try {
    const match = await bcrypt.compare(password, this.password);
    if (match) {
      return Promise.resolve();
    }
    return Promise.reject();
  } catch (error) {
    return Promise.reject(error);
  }
};

userSchema.methods.updateLoggedIn = function () {
  return this.model("User").findOneAndUpdate(
    {
      email: this.email,
    },
    {
      updateDate: new Date(),
    }
  );
};
//delete account
userSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    try {
      console.log(`Preparing to delete user: ${this._id}`);
      next();
    } catch (err) {
      next(err);
    }
  }
);

const User = model("User", userSchema);

export default User;
