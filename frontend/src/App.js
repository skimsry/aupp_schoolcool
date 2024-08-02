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

// import { UserContext } from "./ctx/UserContextProvider";

// const App = () => {
//   return (
//     <Router>
//       <Main />
//     </Router>
//   );
// };

// const Main = () => {
//   const { isAuthenticated, token } = useContext(UserContext);
//   const location = useLocation();
//   const showHeader = [
//     "/",
//     "/announcement",
//     "/about_us",
//     "/contact",
//     "/login",
//     "/signup",
//   ].includes(location.pathname);
//   // const commonRoutes = (
//   //   <>
//   //     <Route path="/" element={<Home />} />
//   //     <Route path="/announcement" element={<Announcement />} />
//   //     <Route path="/about_us" element={<AboutUs />} />
//   //     <Route path="/contact" element={<Contact />} />
//   //     <Route path="/signup" element={<Signup />} />
//   //   </>
//   // );

//   // const authenticatedRoutes = (
//   //   <>
//   //     <Route path="/login" element={<Navigate to="/dashboard" />} />
//   //     <Route path="/dashboard" element={<Dashboard />} />
//   //     <Route path="/updateUser/:userId" element={<AddUser />} />
//   //     <Route path="/addNewUser" element={<AddUser />} />
//   //     <Route path="/manageUsers" element={<ManageUsers />} />
//   //     <Route path="/adim_about_us" element={<AaboutUs />} />
//   //     <Route path="/admin_announcement" element={<Aannoucement />} />
//   //     <Route path="/admin_contact" element={<Acontact />} />
//   //     <Route path="/admin_map" element={<Amap />} />
//   //     <Route path="/admin_partners" element={<Apartner />} />
//   //     <Route path="/admin_slideshow" element={<Aslideshow />} />
//   //     <Route path="/admin_teams" element={<Ateam />} />
//   //     <Route path="/admin_activities" element={<Aactivites />} />
//   //     <Route path="/profile/:_id" element={<Profile />} />
//   //   </>
//   // );

//   // const unauthenticatedRoutes = (
//   //   <>
//   //     <Route path="/login" element={<Login />} />
//   //     <Route path="/dashboard" element={<Navigate to="/login" />} />
//   //     <Route path="/updateUser/:userId" element={<Navigate to="/login" />} />
//   //     <Route path="/addNewUser" element={<Navigate to="/login" />} />
//   //     <Route path="/manageUsers" element={<Navigate to="/login" />} />
//   //     <Route path="/adim_about_us" element={<Navigate to="/login" />} />
//   //     <Route path="/admin_announcement" element={<Navigate to="/login" />} />
//   //     <Route path="/admin_contact" element={<Navigate to="/login" />} />
//   //     <Route path="/admin_map" element={<Navigate to="/login" />} />
//   //     <Route path="/admin_partners" element={<Navigate to="/login" />} />
//   //     <Route path="/admin_slideshow" element={<Navigate to="/login" />} />
//   //     <Route path="/admin_teams" element={<Navigate to="/login" />} />
//   //     <Route path="/admin_activities" element={<Navigate to="/login" />} />
//   //     <Route path="/profile/:_id" element={<Navigate to="/login" />} />
//   //   </>
//   // );
//   return (
//     <div className="App">
//       <div className="header-section">{showHeader && <Header />}</div>
//       <div className="container">
//         {isAuthenticated ? (
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/announcement" element={<Announcement />} />
//             <Route path="/about_us" element={<AboutUs />} />
//             <Route path="/contact" element={<Contact />} />
//             <Route path="/signup" element={<Signup />} />

//             <Route path="/login" element={<Navigate to="/dashboard" />} />
//             <Route path="/dashboard" element={<Dashboard />} />
//             <Route path="/updateUser/:userId" element={<AddUser />} />
//             <Route path="/addNewUser" element={<AddUser />} />

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
//           </Routes>
//         ) : (
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/announcement" element={<Announcement />} />
//             <Route path="/about_us" element={<AboutUs />} />
//             <Route path="/contact" element={<Contact />} />
//             <Route path="/signup" element={<Signup />} />

//             <Route path="/login" element={<Login />} />
//             <Route path="/dashboard" element={<Navigate to="/login" />} />
//             <Route
//               path="/updateUser/:userId"
//               element={<Navigate to="/login" />}
//             />
//             <Route path="/addNewUser/:?" element={<Navigate to="/login" />} />
//             <Route path="/manageUsers" element={<Navigate to="/login" />} />
//             <Route path="/adim_about_us" element={<Navigate to="/login" />} />
//             <Route
//               path="/admin_announcement"
//               element={<Navigate to="/login" />}
//             />
//             <Route path="/admin_contact" element={<Navigate to="/login" />} />
//             <Route path="/admin_map" element={<Navigate to="/login" />} />
//             <Route path="/admin_partners" element={<Navigate to="/login" />} />
//             <Route path="/admin_slideshow" element={<Navigate to="/login" />} />
//             <Route path="/admin_teams" element={<Navigate to="/login" />} />
//             <Route
//               path="/admin_activities"
//               element={<Navigate to="/login" />}
//             />
//             <Route path="/profile/:_id" element={<Navigate to="/login" />} />
//           </Routes>
//         )}
//         {/* <Routes>
//           {commonRoutes}
//           {isAuthenticated ? authenticatedRoutes : unauthenticatedRoutes}
//         </Routes> */}
//       </div>
//       <div className="footer-section">{showHeader && <Footer />}</div>
//     </div>
//   );
// };

// export default App;

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

import { UserContext } from "./ctx/UserContextProvider";
import Slidebar from "./components/dashboard/partial/Slidebar";
import Course from "./components/dashboard/schoolManagement/Course";

const App = () => {
  return (
    <Router>
      <Main />
    </Router>
  );
};

const Main = () => {
  const { isAuthenticated, token } = useContext(UserContext);
  const location = useLocation();
  const showHeader = [
    "/",
    "/announcement",
    "/about_us",
    "/contact",
    "/login",
    "/signup",
  ].includes(location.pathname);

  const showHeader2 = [
    "/manageUsers",
    "/profile/:_id",
    "/admin_activities",
    "/admin_teams",
    "/admin_slideshow",
    "/admin_partners",
    "/admin_map",
    "/updateUser/:userId",
    "/addNewUser",
    "/manageUsers",
    "/adim_about_us",
    "/admin_announcement",
    "/admin_contact",
    "/login",
    "/admin_course",
    "/admin_class_enrollment",
    "/admin_manage_score",
    "/admin_manage_attendant",
  ].includes(location.pathname);

  return (
    <div className="App">
      {isAuthenticated ? (
        <div className="header-section">{showHeader && <Header />}</div>
      ) : (
        <div className="header-section">{showHeader2 && <Header />}</div>
      )}

      <div className="container">
        {isAuthenticated ? (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/announcement" element={<Announcement />} />
            <Route path="/about_us" element={<AboutUs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/signup" element={<Signup />} />

            <Route path="/login" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/updateUser/:userId" element={<AddUser />} />
            <Route path="/addNewUser" element={<AddUser />} />
            {/* <Route path="/addNewUser/:userId?" element={<AddUser />} /> */}
            <Route path="/manageUsers" element={<ManageUsers />} />
            <Route path="/adim_about_us" element={<AaboutUs />} />
            <Route path="/admin_announcement" element={<Aannoucement />} />
            <Route path="/admin_contact" element={<Acontact />} />
            <Route path="/admin_map" element={<Amap />} />
            <Route path="/admin_partners" element={<Apartner />} />
            <Route path="/admin_slideshow" element={<Aslideshow />} />
            <Route path="/admin_teams" element={<Ateam />} />
            <Route path="/admin_activities" element={<Aactivites />} />
            <Route path="/profile/:_id" element={<Profile />} />
            <Route path="/admin_course" element={<Course />} />
            <Route
              path="/admin_class_enrollment"
              element={<ClassEnrollment />}
            />
            <Route path="/admin_manage_score" element={<ManageScore />} />
            <Route
              path="/admin_manage_attendant"
              element={<ManageAttendant />}
            />
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/announcement" element={<Announcement />} />
            <Route path="/about_us" element={<AboutUs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/signup" element={<Signup />} />

            <Route path="/login" element={<Login />} />
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
            <Route path="/admin_manage_attendant" element={<Login />} />
          </Routes>
        )}
      </div>
      <div className="footer-section">{showHeader && <Footer />}</div>
    </div>
  );
};

export default App;
