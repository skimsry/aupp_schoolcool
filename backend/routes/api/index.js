import { Router } from "express";

import {
  loginUser,
  signUpUser,
  getUsers,
  deleteUserById,
  getUsersStudent,
  updateUserStatus,
  getUsersByEmail,
  getUsersById,
  updateUserFull,
} from "../../controllers/user.js";
import { addMap, getMap, updateMap } from "../../controllers/map.js";

const router = Router();
//user
router.post("/users/register", signUpUser);
router.post("/users/login", loginUser);
router.get("/users/getUsers", getUsers);
router.get("/users/getUsersStudent", getUsersStudent);
router.post("/users/delete/:_id", deleteUserById);
router.put("/users/update/:_id", updateUserStatus);
router.get("/users/getUsersByEmail/:email", getUsersByEmail);
router.get("/users/getUsersById/:_id", getUsersById);
router.put("/users/updateFull/:_id", updateUserFull);
//map
router.post("/map/register", addMap);
router.get("/map/getMap", getMap);
router.put("/map/updateMap/:_id", updateMap);
export default router;
