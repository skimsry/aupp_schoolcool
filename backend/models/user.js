import { Schema, model, mongoose } from "mongoose";
//import bcrypt from "bcrypt";

const userSchema = new Schema({
  // const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
  },
  dob: {
    type: Date,
  },
  fos: {
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
  type: {
    type: Number,
  },
  status: {
    type: Boolean,
  },
  createdDate: { type: Date, default: Date.now },
  updateDate: { type: Date, default: Date.now },
});

const User = model("User", userSchema);
// const User = mongoose.model("User", userSchema);

export default User;
