import { Router } from "express";
//import multer from "multer";
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
import {
  addAboutus,
  getAboutus,
  updateAboutus,
} from "../../controllers/aboutus.js";
import {
  addFastcontact,
  getFastcontact,
  updateFastcontact,
} from "../../controllers/fastcontact.js";
import {
  signUpContact,
  getSecondcontact,
  deleteMessageById,
  getMessageByEmail,
} from "../../controllers/secondcontact.js";
import {
  addPartner,
  getPartner,
  getPartnerByName,
  deletePartnerById,
} from "../../controllers/partner.js";
const router = Router();

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/");
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

// const upload = multer({ storage });
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
//aboutus
router.post("/aboutus/register", addAboutus);
router.get("/aboutus/getAboutus", getAboutus);
router.put("/aboutus/updateAboutus/:_id", updateAboutus);
//fastcontact
router.post("/fastcontact/register", addFastcontact);
router.get("/fastcontact/getFastcontact", getFastcontact);
router.put("/fastcontact/updateFastcontact/:_id", updateFastcontact);
//secondcontact
router.post("/secondcontact/register", signUpContact);
router.get("/secondcontact/getSecondcontact", getSecondcontact);
router.post("/secondcontact/delete/:_id", deleteMessageById);
router.get("/secondcontact/getMessageByEmail/:email", getMessageByEmail);
//partner
// router.post("/partner/register", upload.single("logoimg"), addPartner);
router.post("/partner/register", addPartner);
router.get("/partner/getPartner", getPartner);
router.get("/partner/getPartnerByName/:name", getPartnerByName);
router.post("/partner/delete/:_id", deletePartnerById);
export default router;
