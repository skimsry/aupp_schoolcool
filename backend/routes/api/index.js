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
  getUsersTeacher,
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

import { addMteam, getMteam, updateMteam } from "../../controllers/mteam.js";
import {
  addTeam,
  getTeam,
  getTeamByName,
  deleteTeamById,
  updateTeamById,
} from "../../controllers/team.js";
import {
  addTextslideshow,
  getTextslideshow,
  updateTextslideshow,
} from "../../controllers/textslideshow.js";
import {
  addImgslideshow,
  getImgslideshow,
  deleteImgslideshowById,
  getImgslideshowByName,
} from "../../controllers/imgslideshow.js";
import {
  addMAnnouncement,
  getMannouncement,
  updateMannouncement,
} from "../../controllers/mannouncement.js";
import {
  addAnnouncement,
  getAnnouncement,
  getAnnouncementByName,
  deleteAnnouncementById,
  updateAnnouncementById,
} from "../../controllers/announcement.js";
import {
  addMactivity,
  getMactivity,
  updateMactivity,
} from "../../controllers/mactivity.js";
import {
  addActivity,
  getActivity,
  getActivityByName,
  deleteActivityById,
  updateActivityById,
} from "../../controllers/activity.js";
import {
  addCourse,
  getCourse,
  getCourseByName,
  deleteCourseById,
  updateCourseById,
} from "../../controllers/course.js";
import {
  addClassEnrollment,
  getClassEnrollment,
  getClassEnrollmentByName,
  deleteClassEnrollmentById,
  updateClassEnrollmentById,
  getClassEnrollmentById,
} from "../../controllers/classenrollment.js";
// import { combineUC } from "../../controllers/courseuser.js";
import {
  addManagescore,
  getManagescore,
  deleteScoreById,
  updateScoreById,
  getScoreByName,
  getScoreById,
} from "../../controllers/managescore.js";
import {
  addAttendant,
  getAttendentByToday,
  updateAttendentStatus,
} from "../../controllers/attendent.js";
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
router.get("/users/getUsersTeacher", getUsersTeacher);
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
//message team
router.post("/mteam/register", addMteam);
router.get("/mteam/getMteam", getMteam);
router.put("/mteam/updateMteam/:_id", updateMteam);
//team
router.post("/team/register", addTeam);
router.get("/team/getTeam", getTeam);
router.get("/team/getTeamByName/:name", getTeamByName);
router.post("/team/delete/:_id", deleteTeamById);
router.put("/team/updateTeam/:_id", updateTeamById);
//text slideshow
router.post("/tslideshow/register", addTextslideshow);
router.get("/tslideshow/getTslideshow", getTextslideshow);
router.put("/tslideshow/updateTslideshow/:_id", updateTextslideshow);
//image slideshow
router.post("/imgslideshow/register", addImgslideshow);
router.get("/imgslideshow/getImgslideshow", getImgslideshow);
router.get("/imgslideshow/getImgslideshowByName/:name", getImgslideshowByName);
router.post("/imgslideshow/delete/:_id", deleteImgslideshowById);
//message announcement
router.post("/mannouncement/register", addMAnnouncement);
router.get("/mannouncement/getMannouncement", getMannouncement);
router.put("/mannouncement/updateMannouncement/:_id", updateMannouncement);
//announcement
router.post("/announcement/register", addAnnouncement);
router.get("/announcement/getAnnouncement", getAnnouncement);
router.get("/announcement/getAnnouncementByName/:title", getAnnouncementByName);
router.post("/announcement/delete/:_id", deleteAnnouncementById);
router.put("/announcement/updateAnnouncement/:_id", updateAnnouncementById);
//message activity
router.post("/activity/register", addMactivity);
router.get("/activity/getActivity", getMactivity);
router.put("/activity/updateActivity/:_id", updateMactivity);
//activity
router.post("/activities/register", addActivity);
router.get("/activities/getActivities", getActivity);
router.get("/activities/getActivitiesByName/:title", getActivityByName);
router.post("/activities/delete/:_id", deleteActivityById);
router.put("/activities/updateActivities/:_id", updateActivityById);
//course
router.post("/course/register", addCourse);
router.get("/course/getCourse", getCourse);
router.get("/course/getCourseByName/:coursename", getCourseByName);
router.post("/course/delete/:_id", deleteCourseById);
router.put("/course/updateCourse/:_id", updateCourseById);
//classenrollment
router.post("/classenrollment/register", addClassEnrollment);
router.get("/classenrollment/getClassenrollment", getClassEnrollment);
router.get(
  "/classenrollment/getClassenrollmentByName/:course_name",
  getClassEnrollmentByName
);
router.post("/classenrollment/delete/:_id", deleteClassEnrollmentById);
router.put(
  "/classenrollment/updateClassenrollment/:_id",
  updateClassEnrollmentById
);
router.get(
  "/classenrollment/getClassenrollmentById/:course_id",
  getClassEnrollmentById
);
//combine user and Course
// router.get("/combineuc/:id/course", combineUC);
//managescore
router.post("/score/register", addManagescore);
router.get("/score/getScore", getManagescore);
router.get("/score/getScoreByName/:studentname", getScoreByName);
router.post("/score/delete/:_id", deleteScoreById);
router.put("/score/updateScore/:_id", updateScoreById);
router.get("/score/getScoreById/:course_id", getScoreById);
//attendant
router.post("/attendent/register", addAttendant);
router.get("/attendent/getAttendantToday", getAttendentByToday);
router.put("/attendent/updateAttendentStatus/:_id", updateAttendentStatus);
export default router;
