import { Router } from "express";
//import signUpUser from "./signup-user.js";
//import loginUser from "./login-user.js";
import { loginUser, signUpUser, getUsers } from "../../controllers/user.js";

const router = Router();

router.post("/users/register", signUpUser);
router.post("/users/login", loginUser);
router.get("/users/getUsers", getUsers);

export default router;
