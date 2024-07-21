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

// Hash password before saving
userSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

// Check if password matches the hashed password
userSchema.methods.checkPassword = async function (password) {
  try {
    const match = await bcrypt.compare(password, this.password);
    if (match) {
      return Promise.resolve();
    }
    return Promise.reject(new Error("Password mismatch"));
  } catch (error) {
    return Promise.reject(error);
  }
};

// Update the logged-in timestamp
// userSchema.methods.updateLoggedIn = async function () {
//   try {
//     this.updateDate = new Date();
//     await this.save();
//   } catch (error) {
//     return Promise.reject(error);
//   }
// };

// Pre-delete hook to log deletion
// userSchema.pre(
//   "deleteOne",
//   { document: true, query: false },
//   async function (next) {
//     try {
//       console.log(`Preparing to delete user: ${this._id}`);
//       next();
//     } catch (err) {
//       next(err);
//     }
//   }
// );

const User = model("User", userSchema);

export default User;
