import { Router } from "express";
import signUpUser from "./signup-user.js";

const router = Router();

router.post("/users/register", signUpUser);

export default router;
