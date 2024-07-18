import User from "../models/user.js";
import jwt from "jsonwebtoken";
import createError from "../utils/appError.js";
import bcrypt from "bcryptjs";

export const signUpClient = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return next(new createError("User already exist!", 400));
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    const newUser = await User.create({
      ...req.body,
      password: hashedPassword,
    });
    const token = jwt.sign(
      {
        _id: newUser._id,
      },
      "secretkey123",
      { expiresIn: "90d" }
    );
    res.status(201).json({
      status: "success",
      message: "User registered successfully",
      token,
    });
  } catch (error) {
    next(error);
  }
};

const sign = (obj) => {
  return new Promise((resolve, reject) => {
    jwt.sign(obj, process.env.jwtPrivateKey, (error, token) => {
      if (error) return reject(error);
      return resolve(token);
    });
  });
};

const verify = (token) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, process.env.jwtPrivateKey, (error) => {
      if (error) return reject(error);
      return resolve();
    });
  });

export const signUpUser = async ({
  firstName,
  lastName,
  username,
  phoneNumber,
  email,
  password,
  type,
  status,
}) => {
  try {
    const user = await User.create({
      firstName,
      lastName,
      username,
      phoneNumber,
      email,
      password,
      type,
      status,
      createdDate: new Date(),
      updateDate: new Date(),
    });

    const token = await sign({
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });

    return Promise.resolve({
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        updateDate: user.updateDate,
      },
      token,
    });
  } catch (error) {
    return Promise.reject({ error });
  }
};

export const verifyToken = async (token) => {
  try {
    const user = jwt.decode(token);
    const findUser = await User.findOne({ email: user.email });
    if (!findUser) throw new Error("Unauthorized");
    await verify(token);
    return Promise.resolve();
  } catch (error) {
    return Promise.reject({ error: "Unauthorized" });
  }
};

export const verifyUser = async (email) => {
  try {
    const user = await User.findOne({ email });
    return user ? Promise.resolve(true) : Promise.resolve(false);
  } catch (error) {
    return Promise.reject(false);
  }
};

export const loginUser = async ({ email, password }) => {
  try {
    const user = await User.findOne({ email });
    await user.checkPassword(password);
    const token = await sign({
      id: user._id,
      name: user.name,
      email: user.email,
    });

    return Promise.resolve({
      user: { id: user._id, name: user.name },
      token,
    });
  } catch (error) {
    return Promise.reject({ error });
  }
};
