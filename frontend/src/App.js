// import React, { useContext } from "react";
// import "./App.css";
// import {
//   BrowserRouter as Router,
//   Route,
//   Routes,
//   Navigate,
//   useLocation,
// } from "react-router-dom";
// import Header from "./components/header/Header";
// import Footer from "./components/footer/Footer";
// import Home from "./components/home/Home";
// import Announcement from "./components/announcement/Announcement";
// import AboutUs from "./components/aboutUs/AboutUs";
// import Contact from "./components/contact/Contact";
// import Login from "./components/login/Login";
// import Signup from "./components/signup/Signup";
// import Dashboard from "./components/dashboard/partial/Dashboard";
// import AddUser from "./components/dashboard/userManagement/AddUser";
// import ManageUsers from "./components/dashboard/userManagement/ManageUsers";
// import AaboutUs from "./components/dashboard/websiteMaintenace/AaboutUs";
// import Aactivites from "./components/dashboard/websiteMaintenace/Aactivites";
// import Aannoucement from "./components/dashboard/websiteMaintenace/Aannoucement";
// import Acontact from "./components/dashboard/websiteMaintenace/Acontact";
// import Amap from "./components/dashboard/websiteMaintenace/Amap";
// import Apartner from "./components/dashboard/websiteMaintenace/Apartner";
// import Aslideshow from "./components/dashboard/websiteMaintenace/Aslideshow";
// import Ateam from "./components/dashboard/websiteMaintenace/Ateam";
// import Profile from "./components/dashboard/websiteMaintenace/Profile";
// import ClassEnrollment from "./components/dashboard/schoolManagement/ClassEnrollment";
// import ManageScore from "./components/dashboard/schoolManagement/ManageScore";
// import ManageAttendant from "./components/dashboard/schoolManagement/ManageAttendant";
// import Awelcome from "./components/dashboard/websiteMaintenace/Awelcome";
// import Atoc from "./components/dashboard/websiteMaintenace/Atoc";
// import ControlAttendant from "./components/dashboard/schoolManagement/ControlAttendant";
// import ManageAlert from "./components/dashboard/schoolManagement/ManageAlert";
// import Alert from "./components/dashboard/schoolManagement/Alert";

// import { UserContext } from "./ctx/UserContextProvider";
// //import Slidebar from "./components/dashboard/partial/Slidebar";
// import Course from "./components/dashboard/schoolManagement/Course";
// import Rcourse from "./components/dashboard/report/Rcourse";
// import Ralert from "./components/dashboard/report/Ralert";
// import Rattendant from "./components/dashboard/report/Rattendant";
// import Rclass from "./components/dashboard/report/Rclass";
// import Rscore from "./components/dashboard/report/Rscore";
// import Rdashboard from "./components/dashboard/report/Rdashboard";
// import Ruser from "./components/dashboard/report/Ruser";

// const App = () => {
//   return (
//     <Router>
//       <Main />
//     </Router>
//   );
// };

// const Main = () => {
//   //const { isAuthenticated, token } = useContext(UserContext);
//   const { isAuthenticated } = useContext(UserContext);
//   const location = useLocation();
//   const showHeader = [
//     "/",
//     "/announcement",
//     "/about_us",
//     "/contact",
//     "/login",
//     "/signup",
//   ].includes(location.pathname);

//   return (
//     <div className="App">
//       <div className="header-section">{showHeader && <Header />}</div>
//       <div className="container">
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/announcement" element={<Announcement />} />
//           <Route path="/about_us" element={<AboutUs />} />
//           <Route path="/contact" element={<Contact />} />
//           <Route path="/signup" element={<Signup />} />
//           {/* <Route path="*" element={<Navigate to="/" />} /> */}
//         </Routes>
//         {isAuthenticated ? (
//           <Routes>
//             <Route path="/login" element={<Navigate to="/dashboard" />} />
//             <Route path="/dashboard" element={<Dashboard />} />
//             <Route path="/updateUser/:userId" element={<AddUser />} />
//             <Route path="/addNewUser" element={<AddUser />} />
//             {/* <Route path="/addNewUser/:userId?" element={<AddUser />} /> */}
//             <Route path="/manageUsers" element={<ManageUsers />} />
//             <Route path="/adim_about_us" element={<AaboutUs />} />
//             <Route path="/admin_announcement" element={<Aannoucement />} />
//             <Route path="/admin_contact" element={<Acontact />} />
//             <Route path="/admin_map" element={<Amap />} />
//             <Route path="/admin_partners" element={<Apartner />} />
//             <Route path="/admin_slideshow" element={<Aslideshow />} />
//             <Route path="/admin_teams" element={<Ateam />} />
//             <Route path="/admin_activities" element={<Aactivites />} />
//             <Route path="/profile/:_id" element={<Profile />} />
//             <Route path="/admin_course" element={<Course />} />
//             <Route path="/admin_toc" element={<Atoc />} />
//             <Route path="/admin_welcome" element={<Awelcome />} />
//             <Route path="/admin_alert" element={<Alert />} />
//             <Route path="/admin_manage_alert" element={<ManageAlert />} />
//             <Route
//               path="/admin_class_enrollment"
//               element={<ClassEnrollment />}
//             />
//             <Route path="/admin_manage_score" element={<ManageScore />} />
//             <Route
//               path="/admin_daily_attendant"
//               element={<ManageAttendant />}
//             />
//             <Route
//               path="/admin_manage_attendant"
//               element={<ControlAttendant />}
//             />
//             <Route path="/admin_report_course" element={<Rcourse />} />
//             <Route path="/admin_report_class" element={<Rclass />} />
//             <Route path="/admin_report_score" element={<Rscore />} />
//             <Route path="/admin_report_attendant" element={<Rattendant />} />
//             <Route path="/admin_report_alert" element={<Ralert />} />
//             <Route path="/admin_report_dashboard" element={<Rdashboard />} />
//             <Route path="/admin_report_user" element={<Ruser />} />
//             {/* <Route path="*" element={<Navigate to="/" />} /> */}
//           </Routes>
//         ) : (
//           <Routes>
//             <Route path="/login" element={<Login />} />
//             <Route path="/dashboard" element={<Navigate to="/login" />} />
//             <Route path="/updateUser/:userId" element={<Login />} />
//             <Route path="/addNewUser/:?" element={<Login />} />
//             <Route path="/manageUsers" element={<Login />} />
//             <Route path="/adim_about_us" element={<Login />} />
//             <Route path="/admin_announcement" element={<Login />} />
//             <Route path="/admin_contact" element={<Login />} />
//             <Route path="/admin_map" element={<Login />} />
//             <Route path="/admin_partners" element={<Login />} />
//             <Route path="/admin_slideshow" element={<Login />} />
//             <Route path="/admin_teams" element={<Login />} />
//             <Route path="/admin_activities" element={<Login />} />
//             <Route path="/profile/:_id" element={<Login />} />
//             <Route path="/admin_course" element={<Login />} />
//             <Route path="/admin_class_enrollment" element={<Login />} />
//             <Route path="/admin_manage_score" element={<Login />} />
//             <Route path="/admin_daily_attendant" element={<Login />} />
//             <Route path="/admin_toc" element={<Login />} />
//             <Route path="/admin_welcome" element={<Login />} />
//             <Route path="/admin_manage_attendant" element={<Login />} />
//             <Route path="/admin_alert" element={<Login />} />
//             <Route path="/admin_manage_alert" element={<Login />} />
//             <Route path="/admin_report_course" element={<Login />} />
//             <Route path="/admin_report_class" element={<Login />} />
//             <Route path="/admin_report_score" element={<Login />} />
//             <Route path="/admin_report_attendant" element={<Login />} />
//             <Route path="/admin_report_alert" element={<Login />} />
//             <Route path="/admin_report_dashboard" element={<Login />} />
//             <Route path="/admin_report_user" element={<Login />} />
//             {/* <Route path="*" element={<Navigate to="/" />} /> */}
//           </Routes>
//         )}
//       </div>
//       <div className="footer-section">{showHeader && <Footer />}</div>
//     </div>
//   );
// };

// export default App;

//testing protect route
import React, { useContext } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./components/home/Home";
import Announcement from "./components/announcement/Announcement";
import AboutUs from "./components/aboutUs/AboutUs";
import Contact from "./components/contact/Contact";
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
import Dashboard from "./components/dashboard/partial/Dashboard";
import AddUser from "./components/dashboard/userManagement/AddUser";
import ManageUsers from "./components/dashboard/userManagement/ManageUsers";
import AaboutUs from "./components/dashboard/websiteMaintenace/AaboutUs";
import Aactivites from "./components/dashboard/websiteMaintenace/Aactivites";
import Aannoucement from "./components/dashboard/websiteMaintenace/Aannoucement";
import Acontact from "./components/dashboard/websiteMaintenace/Acontact";
import Amap from "./components/dashboard/websiteMaintenace/Amap";
import Apartner from "./components/dashboard/websiteMaintenace/Apartner";
import Aslideshow from "./components/dashboard/websiteMaintenace/Aslideshow";
import Ateam from "./components/dashboard/websiteMaintenace/Ateam";
import Profile from "./components/dashboard/websiteMaintenace/Profile";
import ClassEnrollment from "./components/dashboard/schoolManagement/ClassEnrollment";
import ManageScore from "./components/dashboard/schoolManagement/ManageScore";
import ManageAttendant from "./components/dashboard/schoolManagement/ManageAttendant";
import Awelcome from "./components/dashboard/websiteMaintenace/Awelcome";
import Atoc from "./components/dashboard/websiteMaintenace/Atoc";
import ControlAttendant from "./components/dashboard/schoolManagement/ControlAttendant";
import ManageAlert from "./components/dashboard/schoolManagement/ManageAlert";
import Alert from "./components/dashboard/schoolManagement/Alert";

import { UserContext } from "./ctx/UserContextProvider";
//import Slidebar from "./components/dashboard/partial/Slidebar";
import Course from "./components/dashboard/schoolManagement/Course";
import Rcourse from "./components/dashboard/report/Rcourse";
import Ralert from "./components/dashboard/report/Ralert";
import Rattendant from "./components/dashboard/report/Rattendant";
import Rclass from "./components/dashboard/report/Rclass";
import Rscore from "./components/dashboard/report/Rscore";
import Rdashboard from "./components/dashboard/report/Rdashboard";
import Ruser from "./components/dashboard/report/Ruser";
import UnauthorizedBanner from "./components/UnauthorizedBanner";
import ProtectedRoute from "./components/dashboard/ProtectedRoute";

const App = () => {
  return (
    <Router>
      <Main />
    </Router>
  );
};

const Main = () => {
  //const { isAuthenticated, token } = useContext(UserContext);
  const { isAuthenticated } = useContext(UserContext);
  const location = useLocation();
  const showHeader = [
    "/",
    "/announcement",
    "/about_us",
    "/contact",
    "/login",
    "/signup",
  ].includes(location.pathname);

  return (
    <div className="App">
      <div className="header-section">{showHeader && <Header />}</div>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/announcement" element={<Announcement />} />
          <Route path="/about_us" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        {isAuthenticated ? (
          <Routes>
            {/* <Route path="/login" element={<Navigate to="/dashboard" />} /> */}
            <Route element={<ProtectedRoute requiredTypes={[1, 2, 3, 4]} />}>
              <Route path="/login" element={<Navigate to="/dashboard" />} />
            </Route>
            {/* <Route path="/dashboard" element={<Dashboard />} /> */}
            <Route element={<ProtectedRoute requiredTypes={[1, 2, 3, 4]} />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
            {/* <Route path="/updateUser/:userId" element={<AddUser />} /> */}
            <Route element={<ProtectedRoute requiredTypes={[1, 2, 3, 4]} />}>
              <Route path="/updateUser/:userId" element={<AddUser />} />
            </Route>
            {/* <Route path="/addNewUser" element={<AddUser />} /> */}
            <Route element={<ProtectedRoute requiredTypes={[1]} />}>
              <Route path="/addNewUser" element={<AddUser />} />
            </Route>
            {/* <Route path="/manageUsers" element={<ManageUsers />} /> */}
            <Route element={<ProtectedRoute requiredTypes={[1]} />}>
              <Route path="/manageUsers" element={<ManageUsers />} />
            </Route>
            {/* <Route path="/adim_about_us" element={<AaboutUs />} /> */}
            <Route element={<ProtectedRoute requiredTypes={[1]} />}>
              <Route path="/adim_about_us" element={<AaboutUs />} />
            </Route>
            {/* <Route path="/admin_announcement" element={<Aannoucement />} /> */}
            <Route element={<ProtectedRoute requiredTypes={[1]} />}>
              <Route path="/admin_announcement" element={<Aannoucement />} />
            </Route>
            {/* <Route path="/admin_contact" element={<Acontact />} /> */}
            <Route element={<ProtectedRoute requiredTypes={[1]} />}>
              <Route path="/admin_contact" element={<Acontact />} />
            </Route>
            {/* <Route path="/admin_map" element={<Amap />} /> */}
            <Route element={<ProtectedRoute requiredTypes={[1]} />}>
              <Route path="/admin_map" element={<Amap />} />
            </Route>
            {/* <Route path="/admin_partners" element={<Apartner />} /> */}
            <Route element={<ProtectedRoute requiredTypes={[1]} />}>
              <Route path="/admin_partners" element={<Apartner />} />
            </Route>
            {/* <Route path="/admin_slideshow" element={<Aslideshow />} /> */}
            <Route element={<ProtectedRoute requiredTypes={[1]} />}>
              <Route path="/admin_slideshow" element={<Aslideshow />} />
            </Route>
            {/* <Route path="/admin_teams" element={<Ateam />} /> */}
            <Route element={<ProtectedRoute requiredTypes={[1]} />}>
              <Route path="/admin_teams" element={<Ateam />} />
            </Route>
            {/* <Route path="/admin_activities" element={<Aactivites />} /> */}
            <Route element={<ProtectedRoute requiredTypes={[1]} />}>
              <Route path="/admin_activities" element={<Aactivites />} />
            </Route>
            {/* <Route path="/profile/:_id" element={<Profile />} /> */}
            <Route element={<ProtectedRoute requiredTypes={[1, 2, 3, 4]} />}>
              <Route path="/profile/:_id" element={<Profile />} />
            </Route>
            {/* <Route path="/admin_course" element={<Course />} /> */}
            <Route element={<ProtectedRoute requiredTypes={[1]} />}>
              <Route path="/admin_course" element={<Course />} />
            </Route>
            {/* <Route path="/admin_toc" element={<Atoc />} /> */}
            <Route element={<ProtectedRoute requiredTypes={[1]} />}>
              <Route path="/admin_toc" element={<Atoc />} />
            </Route>
            {/* <Route path="/admin_welcome" element={<Awelcome />} /> */}
            <Route element={<ProtectedRoute requiredTypes={[1]} />}>
              <Route path="/admin_welcome" element={<Awelcome />} />
            </Route>
            {/* <Route path="/admin_alert" element={<Alert />} /> */}
            <Route element={<ProtectedRoute requiredTypes={[1, 2, 3, 4]} />}>
              <Route path="/admin_alert" element={<Alert />} />
            </Route>
            {/* <Route path="/admin_manage_alert" element={<ManageAlert />} /> */}
            <Route element={<ProtectedRoute requiredTypes={[1, 2]} />}>
              <Route path="/admin_manage_alert" element={<ManageAlert />} />
            </Route>
            {/* <Route
              path="/admin_class_enrollment"
              element={<ClassEnrollment />}
            /> */}
            <Route element={<ProtectedRoute requiredTypes={[1]} />}>
              <Route
                path="/admin_class_enrollment"
                element={<ClassEnrollment />}
              />
            </Route>
            {/* <Route path="/admin_manage_score" element={<ManageScore />} /> */}
            <Route element={<ProtectedRoute requiredTypes={[1, 2]} />}>
              <Route path="/admin_manage_score" element={<ManageScore />} />
            </Route>
            {/* <Route
              path="/admin_daily_attendant"
              element={<ManageAttendant />}
            /> */}
            <Route element={<ProtectedRoute requiredTypes={[1, 2]} />}>
              <Route
                path="/admin_daily_attendant"
                element={<ManageAttendant />}
              />
            </Route>
            {/* <Route
              path="/admin_manage_attendant"
              element={<ControlAttendant />}
            /> */}
            <Route element={<ProtectedRoute requiredTypes={[1]} />}>
              <Route
                path="/admin_manage_attendant"
                element={<ControlAttendant />}
              />
            </Route>
            {/* <Route path="/admin_report_course" element={<Rcourse />} /> */}
            <Route element={<ProtectedRoute requiredTypes={[1]} />}>
              <Route path="/admin_report_course" element={<Rcourse />} />
            </Route>
            {/* <Route path="/admin_report_class" element={<Rclass />} /> */}
            <Route element={<ProtectedRoute requiredTypes={[1]} />}>
              <Route path="/admin_report_class" element={<Rclass />} />
            </Route>
            {/* <Route path="/admin_report_score" element={<Rscore />} /> */}
            <Route element={<ProtectedRoute requiredTypes={[1, 2, 3, 4]} />}>
              <Route path="/admin_report_score" element={<Rscore />} />
            </Route>
            {/* <Route path="/admin_report_attendant" element={<Rattendant />} /> */}
            <Route element={<ProtectedRoute requiredTypes={[1, 2, 3, 4]} />}>
              <Route path="/admin_report_attendant" element={<Rattendant />} />
            </Route>
            {/* <Route path="/admin_report_alert" element={<Ralert />} /> */}
            <Route element={<ProtectedRoute requiredTypes={[1, 2, 3, 4]} />}>
              <Route path="/admin_report_alert" element={<Ralert />} />
            </Route>
            {/* <Route path="/admin_report_dashboard" element={<Rdashboard />} /> */}
            <Route element={<ProtectedRoute requiredTypes={[1, 2, 3, 4]} />}>
              <Route path="/admin_report_dashboard" element={<Rdashboard />} />
            </Route>
            {/* <Route path="/admin_report_user" element={<Ruser />} /> */}
            <Route element={<ProtectedRoute requiredTypes={[1]} />}>
              <Route path="/admin_report_user" element={<Ruser />} />
            </Route>
            {/* <Route path="/unauthorized" element={<UnauthorizedBanner />} /> */}
            <Route element={<ProtectedRoute requiredTypes={[2, 3, 4]} />}>
              <Route path="/unauthorized" element={<UnauthorizedBanner />} />
            </Route>
          </Routes>
        ) : (
          <Routes>
            {/* <Route path="/login" element={<Login />} /> */}
            <Route path="/dashboard" element={<Navigate to="/login" />} />
            <Route path="/updateUser/:userId" element={<Login />} />
            <Route path="/addNewUser/:?" element={<Login />} />
            <Route path="/manageUsers" element={<Login />} />
            <Route path="/adim_about_us" element={<Login />} />
            <Route path="/admin_announcement" element={<Login />} />
            <Route path="/admin_contact" element={<Login />} />
            <Route path="/admin_map" element={<Login />} />
            <Route path="/admin_partners" element={<Login />} />
            <Route path="/admin_slideshow" element={<Login />} />
            <Route path="/admin_teams" element={<Login />} />
            <Route path="/admin_activities" element={<Login />} />
            <Route path="/profile/:_id" element={<Login />} />
            <Route path="/admin_course" element={<Login />} />
            <Route path="/admin_class_enrollment" element={<Login />} />
            <Route path="/admin_manage_score" element={<Login />} />
            <Route path="/admin_daily_attendant" element={<Login />} />
            <Route path="/admin_toc" element={<Login />} />
            <Route path="/admin_welcome" element={<Login />} />
            <Route path="/admin_manage_attendant" element={<Login />} />
            <Route path="/admin_alert" element={<Login />} />
            <Route path="/admin_manage_alert" element={<Login />} />
            <Route path="/admin_report_course" element={<Login />} />
            <Route path="/admin_report_class" element={<Login />} />
            <Route path="/admin_report_score" element={<Login />} />
            <Route path="/admin_report_attendant" element={<Login />} />
            <Route path="/admin_report_alert" element={<Login />} />
            <Route path="/admin_report_dashboard" element={<Login />} />
            <Route path="/admin_report_user" element={<Login />} />
            <Route path="/unauthorized" element={<Login />} />
          </Routes>
        )}
      </div>
      <div className="footer-section">{showHeader && <Footer />}</div>
    </div>
  );
};

export default App;
