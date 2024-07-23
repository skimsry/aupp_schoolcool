import { Router } from "express";
//import signUpUser from "./signup-user.js";
//import loginUser from "./login-user.js";
import {
  loginUser,
  signUpUser,
  getUsers,
  deleteUserById,
  getUsersStudent,
} from "../../controllers/user.js";

const router = Router();

router.post("/users/register", signUpUser);
router.post("/users/login", loginUser);
router.get("/users/getUsers", getUsers);
router.get("/users/getUsersStudent", getUsersStudent);
router.post("/users/delete/:_id", deleteUserById);

export default router;
