import { Router } from "express";
import signUpUser from "./signup-user.js";
import loginUser from "./login-user.js";

import { signUpClient } from "../../controllers/user.js";

const router = Router();

router.post("/users/register", signUpUser);
router.post("/users/login", loginUser);

router.post("/users/sign_up_client", signUpClient);

export default router;
