import User from "../models/user.js";
import jwt from "jsonwebtoken";
//import createError from "../utils/appError.js";
import bcrypt from "bcryptjs";
// import bcrypt from "bcrypt";

// export const signUpClient = async (req, res, next) => {
//   // try {
//   //   const user = await User.findOne({ email: req.body.email });
//   //   if (user) {
//   //     return next(new createError("User already exist!", 400));
//   //   }
//   //   const hashedPassword = await bcrypt.hash(req.body.password, 10);
//   //   const newUser = await User.create({
//   //     ...req.body,
//   //     password: hashedPassword,
//   //   });
//   //   const token = jwt.sign(
//   //     {
//   //       _id: newUser._id,
//   //     },
//   //     "secretkey123",
//   //     { expiresIn: "90d" }
//   //   );
//   //   res.status(201).json({
//   //     status: "success",
//   //     message: "User registered successfully",
//   //     token,
//   //   });
//   // } catch (error) {
//   //   next(error);
//   // }
// };

// export const login = async (req, res, next) => {
//   // try {
//   //   const { email, password } = req.body;
//   //   const user = await User.findOne({ email });
//   //   if (!user) return next(new createError("User not found!", 404));
//   //   const isPasswordValid = await bcrypt.compare(password, user.password);
//   //   if (!isPasswordValid) {
//   //     return next(new createError("Invalid email or password", 401));
//   //   }
//   //   const token = jwt.sign({ id: user._id }, "secretkey123", {
//   //     expiresIn: "90d",
//   //   });
//   //   res.status(200).json({
//   //     status: "success",
//   //     token,
//   //     message: "Logged in successfully",
//   //     user: {
//   //       _id: user._id,
//   //       firstName: user.firstName,
//   //       lastName: user.lastName,
//   //       phoneNumber: user.phoneNumber,
//   //       email: user.email,
//   //       type: user.type,
//   //     },
//   //   });
//   // } catch (error) {
//   //   next(error);
//   // }
// };

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

// export const signUpUser = async ({
//   firstName,
//   lastName,
//   phoneNumber,
//   email,
//   password,
//   type,
//   status,
// }) => {
//   try {
//     const user = await User.create({
//       firstName,
//       lastName,
//       phoneNumber,
//       email,
//       password,
//       type,
//       status,
//       createdDate: new Date(),
//       updateDate: new Date(),
//     });

//     const token = await sign({
//       id: user._id,
//       firstName: user.firstName,
//       lastName: user.lastName,
//       email: user.email,
//     });

//     return Promise.resolve({
//       user: {
//         id: user._id,
//         firstName: user.firstName,
//         lastName: user.lastName,
//         updateDate: user.updateDate,
//       },
//       token,
//     });
//   } catch (error) {
//     return Promise.reject({ error });
//   }
// };

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

// export const loginUser = async ({ email, password }) => {
//   try {
//     const user = await User.findOne({ email });
//     await user.checkPassword(password);
//     const token = await sign({
//       id: user._id,
//       name: user.name,
//       email: user.email,
//     });

//     return Promise.resolve({
//       user: { id: user._id, name: user.name },
//       token,
//     });
//   } catch (error) {
//     return Promise.reject({ error });
//   }
// };
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Check if the user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    if (!user.status) {
      // console.log(user.status);
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate a JWT token with user data in the payload
    const token = jwt.sign(
      {
        _id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      process.env.JWT_SECRET
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        type: user.type,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const signUpUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      gender,
      dob,
      fos,
      phoneNumber,
      email,
      password,
      type,
      status,
    } = req.body;

    // Check if the user already exists with the provided email
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists with this email" });
    }

    // Hash the user's password and security answer
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({
      firstName,
      lastName,
      gender,
      dob,
      fos,
      phoneNumber,
      email,
      password: hashedPassword,
      type,
      status,
      createdDate: new Date(),
      updateDate: new Date(),
    });

    // Save the user to the database
    await user.save();
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdDate: -1 }); // Retrieve all users

    if (!users.length) {
      return res.status(404).json({ message: "No users found" });
    }

    // Send all users as the response
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const deleteUserById = async (req, res) => {
  // const { id } = req.params; // Get the user ID from the request parameters
  const { _id } = req.params;
  // console.log(_id);
  try {
    const deletedUser = await User.findByIdAndDelete(_id); // Delete the user by ID

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Send success response
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getUsersStudent = async (req, res) => {
  try {
    const users = await User.find({ type: 3 }).sort({ createdDate: -1 });

    if (!users.length) {
      return res.status(404).json({ message: "No users found" });
    }

    // Send all users as the response
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// export const updateUserStatus = async (req, res) => {
//   try {
//     const { _id } = req.params;

//     const { status, ...body } = req.body;
//     const opisiteStatus = !status; // Reassigning status variable to true
//     const updatedUserData = { ...body, status: opisiteStatus }; // Adding status to the updated user data
//     console.log(status);

//     const updatedUser = await User.findByIdAndUpdate(_id, updatedUserData, {
//       new: true,
//     });

//     if (!updatedUser) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res
//       .status(200)
//       .json({ message: "User can access successfully", user: updatedUser });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

export const updateUserStatus = async (req, res) => {
  try {
    const { _id } = req.params;

    // Fetch the current user to get the current status
    const currentUser = await User.findById(_id);
    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Toggle the status
    const newStatus = !currentUser.status;

    // Prepare updated user data
    const updatedUserData = { ...req.body, status: newStatus };

    // Update the user with the new status
    const updatedUser = await User.findByIdAndUpdate(_id, updatedUserData, {
      new: true,
    });

    res
      .status(200)
      .json({ message: "User status updated successfully", user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getUsersByEmail = async (req, res) => {
  try {
    const { email } = req.params;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email });

    // console.log(user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Send the user as the response
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getUsersById = async (req, res) => {
  const { _id } = req.params;
  try {
    if (!_id) {
      return res.status(400).json({ message: "Id is required" });
    }

    // const user = await User.findById({ _id });
    const user = await User.findById(_id);

    // console.log(user);
    if (!user) {
      return res.status(404).json({ message: "Id is not found" });
    }

    // Send the user as the response
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
