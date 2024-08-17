// import { Router } from "express";
// import verifyRole from "../../controllers/verifyRole.js";
// import {
//   loginUser,
//   signUpUser,
//   getUsers,
//   deleteUserById,
//   getUsersStudent,
//   updateUserStatus,
//   getUsersByEmail,
//   getUsersById,
//   updateUserFull,
//   getUsersTeacher,
//   getUsersByType,
//   getUsersActive,
//   getUsersToday,
//   getUsersAdmin,
//   getUsersParent,
//   getUsersNo,
//   getUsersByCriteria,
// } from "../../controllers/user.js";
// import { addMap, getMap, updateMap } from "../../controllers/map.js";
// import {
//   addAboutus,
//   getAboutus,
//   updateAboutus,
// } from "../../controllers/aboutus.js";
// import {
//   addFastcontact,
//   getFastcontact,
//   updateFastcontact,
// } from "../../controllers/fastcontact.js";
// import {
//   signUpContact,
//   getSecondcontact,
//   deleteMessageById,
//   getMessageByEmail,
// } from "../../controllers/secondcontact.js";
// import {
//   addPartner,
//   getPartner,
//   getPartnerByName,
//   deletePartnerById,
// } from "../../controllers/partner.js";

// import { addMteam, getMteam, updateMteam } from "../../controllers/mteam.js";
// import {
//   addTeam,
//   getTeam,
//   getTeamByName,
//   deleteTeamById,
//   updateTeamById,
// } from "../../controllers/team.js";
// import {
//   addTextslideshow,
//   getTextslideshow,
//   updateTextslideshow,
// } from "../../controllers/textslideshow.js";
// import {
//   addImgslideshow,
//   getImgslideshow,
//   deleteImgslideshowById,
//   getImgslideshowByName,
// } from "../../controllers/imgslideshow.js";
// import {
//   addMAnnouncement,
//   getMannouncement,
//   updateMannouncement,
// } from "../../controllers/mannouncement.js";
// import {
//   addAnnouncement,
//   getAnnouncement,
//   getAnnouncementByName,
//   deleteAnnouncementById,
//   updateAnnouncementById,
// } from "../../controllers/announcement.js";
// import {
//   addMactivity,
//   getMactivity,
//   updateMactivity,
// } from "../../controllers/mactivity.js";
// import {
//   addActivity,
//   getActivity,
//   getActivityByName,
//   deleteActivityById,
//   updateActivityById,
// } from "../../controllers/activity.js";
// import {
//   addCourse,
//   getCourse,
//   getCourseByName,
//   deleteCourseById,
//   updateCourseById,
//   updateCourseStatus,
//   getCourseStatus,
//   getCourseToday,
//   getCourseByCriteria,
// } from "../../controllers/course.js";
// import {
//   addClassEnrollment,
//   getClassEnrollment,
//   getClassEnrollmentByName,
//   deleteClassEnrollmentById,
//   updateClassEnrollmentById,
//   getClassEnrollmentById,
//   getClassEnrollmentCheck,
//   getClassEnrollmentToday,
//   getClassEnrollmentByCriteria,
// } from "../../controllers/classenrollment.js";
// // import { combineUC } from "../../controllers/courseuser.js";
// import {
//   addManagescore,
//   getManagescore,
//   deleteScoreById,
//   updateScoreById,
//   getScoreByName,
//   getScoreById,
//   getScoresToday,
//   getScoreByCriteria,
// } from "../../controllers/managescore.js";
// import {
//   addAttendant,
//   getAttendentByToday,
//   updateAttendentStatus,
//   getAttendentByAll,
//   getAttendentByName,
//   getAttendentById,
//   getAttendentByCriteria,
//   getAttendentToday,
//   getAttendentByCriteria2,
// } from "../../controllers/attendent.js";
// import { addToc, getToc, updateToc } from "../../controllers/toc.js";
// import {
//   addAwelcome,
//   getWelcome,
//   updateWelcome,
// } from "../../controllers/welcome.js";
// const router = Router();

// import {
//   addAlert,
//   getAlert,
//   getAlertByTitle,
//   deleteAlertByTitleCode,
//   updateAlertByTitleCode,
//   getAlertStatus,
//   getAlertByTitleCode,
//   getAlertAll,
//   getAlertToday,
//   getAlertByCriteria,
// } from "../../controllers/alert.js";
// import multer from "multer";
// import path from "path";
// import { mkdirp } from "mkdirp";
// //user
// router.post("/users/register", signUpUser);
// router.post("/users/login", loginUser);
// router.get("/users/getUsers", getUsers);
// router.get("/users/getUsersActive", getUsersActive);
// router.get("/users/getUsersStudent", getUsersStudent);
// router.post("/users/delete/:_id", deleteUserById);
// router.put("/users/update/:_id", updateUserStatus);
// router.get("/users/getUsersByEmail/:email", getUsersByEmail);
// router.get("/users/getUsersById/:_id", getUsersById);
// router.put("/users/updateFull/:_id", updateUserFull);
// router.get("/users/getUsersTeacher", getUsersTeacher);
// router.get("/users/getUsersByType", getUsersByType);
// router.get("/users/getUsersToday", getUsersToday);
// router.get("/users/getUsersAdmin", getUsersAdmin);
// router.get("/users/getUsersParent", getUsersParent);
// router.get("/users/getUsersNo", getUsersNo);
// router.get("/users/getUserByCriteria", getUsersByCriteria);
// //map
// router.post("/map/register", addMap);
// router.get("/map/getMap", getMap);
// router.put("/map/updateMap/:_id", updateMap);
// //aboutus
// router.post("/aboutus/register", addAboutus);
// router.get("/aboutus/getAboutus", getAboutus);
// router.put("/aboutus/updateAboutus/:_id", updateAboutus);
// //fastcontact
// router.post("/fastcontact/register", addFastcontact);
// router.get("/fastcontact/getFastcontact", getFastcontact);
// router.put("/fastcontact/updateFastcontact/:_id", updateFastcontact);
// //secondcontact
// router.post("/secondcontact/register", signUpContact);
// router.get("/secondcontact/getSecondcontact", getSecondcontact);
// router.post("/secondcontact/delete/:_id", deleteMessageById);
// router.get("/secondcontact/getMessageByEmail/:email", getMessageByEmail);
// //partner
// // router.post("/partner/register", upload.single("logoimg"), addPartner);
// router.post("/partner/register", addPartner);
// router.get("/partner/getPartner", getPartner);
// router.get("/partner/getPartnerByName/:name", getPartnerByName);
// router.post("/partner/delete/:_id", deletePartnerById);
// //message team
// router.post("/mteam/register", addMteam);
// router.get("/mteam/getMteam", getMteam);
// router.put("/mteam/updateMteam/:_id", updateMteam);
// //team
// router.post("/team/register", addTeam);
// router.get("/team/getTeam", getTeam);
// router.get("/team/getTeamByName/:name", getTeamByName);
// router.post("/team/delete/:_id", deleteTeamById);
// router.put("/team/updateTeam/:_id", updateTeamById);
// //text slideshow
// router.post("/tslideshow/register", addTextslideshow);
// router.get("/tslideshow/getTslideshow", getTextslideshow);
// router.put("/tslideshow/updateTslideshow/:_id", updateTextslideshow);
// //image slideshow
// router.post("/imgslideshow/register", addImgslideshow);
// router.get("/imgslideshow/getImgslideshow", getImgslideshow);
// router.get("/imgslideshow/getImgslideshowByName/:name", getImgslideshowByName);
// router.post("/imgslideshow/delete/:_id", deleteImgslideshowById);
// //message announcement
// router.post("/mannouncement/register", addMAnnouncement);
// router.get("/mannouncement/getMannouncement", getMannouncement);
// router.put("/mannouncement/updateMannouncement/:_id", updateMannouncement);
// //announcement
// router.post("/announcement/register", addAnnouncement);
// router.get("/announcement/getAnnouncement", getAnnouncement);
// router.get("/announcement/getAnnouncementByName/:title", getAnnouncementByName);
// router.post("/announcement/delete/:_id", deleteAnnouncementById);
// router.put("/announcement/updateAnnouncement/:_id", updateAnnouncementById);
// //message activity
// router.post("/activity/register", addMactivity);
// router.get("/activity/getActivity", getMactivity);
// router.put("/activity/updateActivity/:_id", updateMactivity);
// //activity
// router.post("/activities/register", addActivity);
// router.get("/activities/getActivities", getActivity);
// router.get("/activities/getActivitiesByName/:title", getActivityByName);
// router.post("/activities/delete/:_id", deleteActivityById);
// router.put("/activities/updateActivities/:_id", updateActivityById);
// //course
// router.post("/course/register", addCourse);
// router.get("/course/getCourse", getCourse);
// router.get("/course/getCourseStatus", getCourseStatus);
// router.get("/course/getCourseToday", getCourseToday);
// router.get("/course/getCourseByName/:coursename", getCourseByName);
// router.post("/course/delete/:_id", deleteCourseById);
// router.put("/course/updateCourse/:_id", updateCourseById);
// router.put("/course/update/:_id", updateCourseStatus);
// router.get("/course/getCourseByCriteria", getCourseByCriteria);
// //classenrollment
// router.post("/classenrollment/register", addClassEnrollment);
// router.get("/classenrollment/getClassenrollment", getClassEnrollment);
// router.get("/classenrollment/getClassenrollmentToday", getClassEnrollmentToday);
// router.get(
//   "/classenrollment/getClassenrollmentByName/:course_name",
//   getClassEnrollmentByName
// );
// router.post("/classenrollment/delete/:_id", deleteClassEnrollmentById);
// router.put(
//   "/classenrollment/updateClassenrollment/:_id",
//   updateClassEnrollmentById
// );
// router.get(
//   "/classenrollment/getClassenrollmentById/:course_id",
//   getClassEnrollmentById
// );
// router.get("/classenrollment/check", getClassEnrollmentCheck);
// router.get(
//   "/classenrollment/getClassEnrollmentByCriteria",
//   getClassEnrollmentByCriteria
// );
// //combine user and Course
// // router.get("/combineuc/:id/course", combineUC);
// //managescore
// router.post("/score/register", addManagescore);
// router.get("/score/getScore", getManagescore);
// router.get("/score/getScoreToday", getScoresToday);
// router.get("/score/getScoreByCriteria", getScoreByCriteria);
// router.get("/score/getScoreByName/:studentname", getScoreByName);
// router.post("/score/delete/:_id", deleteScoreById);
// router.put("/score/updateScore/:_id", updateScoreById);
// router.get("/score/getScoreById/:course_id", getScoreById);
// //attendant
// router.post("/attendent/register", addAttendant);
// router.get("/attendent/getAttendantToday", getAttendentByToday);
// router.put("/attendent/updateAttendentStatus/:_id", updateAttendentStatus);
// router.get("/attendent/getAttendantAll", getAttendentByAll);
// router.get("/attendent/getAttendantByName/:studentname", getAttendentByName);
// router.get("/attendent/getAttendantById/:_id", getAttendentById);
// router.get("/attendent/getAttendantByCriteria", getAttendentByCriteria);
// router.get("/attendent/getAttendantByCriteria2", getAttendentByCriteria2);
// router.get("/attendent/getAttendantToday2", getAttendentToday);

// //toc
// router.post("/toc/register", addToc);
// router.get("/toc/getToc", getToc);
// router.put("/toc/updateToc/:_id", updateToc);
// //toc
// router.post("/welcome/register", addAwelcome);
// router.get("/welcome/getWelcome", getWelcome);
// router.put("/welcome/updateWelcome/:_id", updateWelcome);

// //testing upload
// const getCurrentDate = () => {
//   const today = new Date();
//   const year = today.getFullYear();
//   const month = String(today.getMonth() + 1).padStart(2, "0");
//   const day = String(today.getDate()).padStart(2, "0");
//   return `${day}-${month}-${year}`;
// };

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     const dateFolder = getCurrentDate();
//     const dir = path.join("uploads/alerts", dateFolder);

//     mkdirp(dir).then(() => cb(null, dir));
//   },
//   filename: function (req, file, cb) {
//     // cb(null, Date.now() + "-" + "Alert-" + file.originalname);
//     cb(null, "Alert-" + Date.now() + "." + file.originalname.split(".").pop());
//   },
// });
// const upload = multer({ storage: storage });
// router.post("/admin_alert_upload", upload.array("photos", 10), addAlert);
// router.get("/alert/getAlert", getAlert);
// router.get("/alert/getAlertStatus", getAlertStatus);
// router.get("/alert/getAlertAll", getAlertAll);
// router.get("/alert/getAlertToday", getAlertToday);
// router.get("/alert/getAlertByCriteria", getAlertByCriteria);
// router.get("/alert/getAlertByCodeTitle", getAlertByTitleCode);
// router.get("/alert/getAlertByTitle/:title", getAlertByTitle);
// router.post("/alert/delete/:codeTitle", deleteAlertByTitleCode);
// router.put(
//   "/alert/updateAlert/:codeTitle",
//   upload.array("photos", 10),
//   updateAlertByTitleCode
// );
// export default router;

//testing protect role
import { Router } from "express";
import verifyRole from "../../controllers/verifyRole.js";
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
  getUsersByType,
  getUsersActive,
  getUsersToday,
  getUsersAdmin,
  getUsersParent,
  getUsersNo,
  getUsersByCriteria,
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
  updateCourseStatus,
  getCourseStatus,
  getCourseToday,
  getCourseByCriteria,
} from "../../controllers/course.js";
import {
  addClassEnrollment,
  getClassEnrollment,
  getClassEnrollmentByName,
  deleteClassEnrollmentById,
  updateClassEnrollmentById,
  getClassEnrollmentById,
  getClassEnrollmentCheck,
  getClassEnrollmentToday,
  getClassEnrollmentByCriteria,
  getClassEnrollmentByStudentId,
} from "../../controllers/classenrollment.js";
// import { combineUC } from "../../controllers/courseuser.js";
import {
  addManagescore,
  getManagescore,
  deleteScoreById,
  updateScoreById,
  getScoreByName,
  getScoreById,
  getScoresToday,
  getScoreByCriteria,
  getScoreFromTeacherByCriteria,
} from "../../controllers/managescore.js";
import {
  addAttendant,
  getAttendentByToday,
  updateAttendentStatus,
  getAttendentByAll,
  getAttendentByName,
  getAttendentById,
  getAttendentByCriteria,
  getAttendentToday,
  getAttendentByCriteria2,
} from "../../controllers/attendent.js";
import { addToc, getToc, updateToc } from "../../controllers/toc.js";
import {
  addAwelcome,
  getWelcome,
  updateWelcome,
} from "../../controllers/welcome.js";
const router = Router();

import {
  addAlert,
  getAlert,
  getAlertByTitle,
  deleteAlertByTitleCode,
  updateAlertByTitleCode,
  getAlertStatus,
  getAlertByTitleCode,
  getAlertAll,
  getAlertToday,
  getAlertByCriteria,
  getAlertStudentByCriteria,
  getAlertStudentByCriteriaP,
  getAlertStudentByCriteriaT,
} from "../../controllers/alert.js";
import multer from "multer";
import path from "path";
import { mkdirp } from "mkdirp";
//user
router.get("/test", verifyRole([1]), (req, res) => {
  res.send("Access granted.");
});
router.post("/users/register", signUpUser);
router.post("/users/login", loginUser);
router.get("/users/getUsers", getUsers);
router.get("/users/getUsersActive", getUsersActive);
router.get("/users/getUsersStudent", getUsersStudent);
router.post("/users/delete/:_id", deleteUserById);
router.put("/users/update/:_id", updateUserStatus);
router.get("/users/getUsersByEmail/:email", getUsersByEmail);
router.get("/users/getUsersById/:_id", getUsersById);
router.put("/users/updateFull/:_id", updateUserFull);
router.get("/users/getUsersTeacher", getUsersTeacher);
router.get("/users/getUsersByType", getUsersByType);
router.get("/users/getUsersToday", getUsersToday);
router.get("/users/getUsersAdmin", getUsersAdmin);
router.get("/users/getUsersParent", getUsersParent);
router.get("/users/getUsersNo", getUsersNo);
router.get("/users/getUserByCriteria", getUsersByCriteria);
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
router.get("/course/getCourseStatus", getCourseStatus);
router.get("/course/getCourseToday", getCourseToday);
router.get("/course/getCourseByName/:coursename", getCourseByName);
router.post("/course/delete/:_id", deleteCourseById);
router.put("/course/updateCourse/:_id", updateCourseById);
router.put("/course/update/:_id", updateCourseStatus);
router.get("/course/getCourseByCriteria", getCourseByCriteria);
//classenrollment
router.post("/classenrollment/register", addClassEnrollment);
router.get("/classenrollment/getClassenrollment", getClassEnrollment);
router.get("/classenrollment/getClassenrollmentToday", getClassEnrollmentToday);
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
router.get("/classenrollment/check", getClassEnrollmentCheck);
router.get(
  "/classenrollment/getClassEnrollmentByCriteria",
  getClassEnrollmentByCriteria
);
router.get(
  "/classenrollment/getClassenrollmentByStudentId/:student_id",
  getClassEnrollmentByStudentId
);
//combine user and Course
// router.get("/combineuc/:id/course", combineUC);
//managescore
router.post("/score/register", addManagescore);
router.get("/score/getScore", getManagescore);
router.get("/score/getScoreToday", getScoresToday);
router.get("/score/getScoreByCriteria", getScoreByCriteria);
router.get("/score/getScoreByName/:studentname", getScoreByName);
router.post("/score/delete/:_id", deleteScoreById);
router.put("/score/updateScore/:_id", updateScoreById);
router.get("/score/getScoreById/:course_id", getScoreById);
router.get(
  "/score/getScoreFromTeacherByCriteria",
  getScoreFromTeacherByCriteria
);
//attendant
router.post("/attendent/register", addAttendant);
router.get("/attendent/getAttendantToday", getAttendentByToday);
router.put("/attendent/updateAttendentStatus/:_id", updateAttendentStatus);
router.get("/attendent/getAttendantAll", getAttendentByAll);
router.get("/attendent/getAttendantByName/:studentname", getAttendentByName);
router.get("/attendent/getAttendantById/:_id", getAttendentById);
router.get("/attendent/getAttendantByCriteria", getAttendentByCriteria);
router.get("/attendent/getAttendantByCriteria2", getAttendentByCriteria2);
router.get("/attendent/getAttendantToday2", getAttendentToday);

//toc
router.post("/toc/register", addToc);
router.get("/toc/getToc", getToc);
router.put("/toc/updateToc/:_id", updateToc);
//toc
router.post("/welcome/register", addAwelcome);
router.get("/welcome/getWelcome", getWelcome);
router.put("/welcome/updateWelcome/:_id", updateWelcome);

//testing upload
const getCurrentDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${day}-${month}-${year}`;
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dateFolder = getCurrentDate();
    const dir = path.join("uploads/alerts", dateFolder);

    mkdirp(dir).then(() => cb(null, dir));
  },
  filename: function (req, file, cb) {
    // cb(null, Date.now() + "-" + "Alert-" + file.originalname);
    cb(null, "Alert-" + Date.now() + "." + file.originalname.split(".").pop());
  },
});
const upload = multer({ storage: storage });
router.post("/admin_alert_upload", upload.array("photos", 10), addAlert);
router.get("/alert/getAlert", getAlert);
router.get("/alert/getAlertStatus", getAlertStatus);
router.get("/alert/getAlertAll", getAlertAll);
router.get("/alert/getAlertToday", getAlertToday);
router.get("/alert/getAlertByCriteria", getAlertByCriteria);
router.get("/alert/getAlertByCodeTitle", getAlertByTitleCode);
router.get("/alert/getAlertByTitle/:title", getAlertByTitle);
router.post("/alert/delete/:codeTitle", deleteAlertByTitleCode);
router.put(
  "/alert/updateAlert/:codeTitle",
  upload.array("photos", 10),
  updateAlertByTitleCode
);
router.get("/alert/getAlertStudentByCriteria", getAlertStudentByCriteria);
router.get("/alert/getAlertStudentByCriteriaP", getAlertStudentByCriteriaP);
router.get("/alert/getAlertStudentByCriteriaT", getAlertStudentByCriteriaT);
export default router;
