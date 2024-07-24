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

import { UserContext } from "./ctx/UserContextProvider";

const App = () => {
  return (
    <Router>
      <Main />
    </Router>
  );
};

const Main = () => {
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
          <Route
            path="/login"
            element={
              !isAuthenticated ? <Login /> : <Navigate to="/dashboard" />
            }
          />
          <Route path="/signup" element={<Signup />} />

          <Route
            path="/dashboard"
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/updateUser/:userId"
            element={isAuthenticated ? <AddUser /> : <Navigate to="/login" />}
          />
          <Route
            path="/addNewUser/"
            element={isAuthenticated ? <AddUser /> : <Navigate to="/login" />}
          />
          <Route
            path="/manageUsers"
            element={
              isAuthenticated ? <ManageUsers /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/adim_about_us"
            element={isAuthenticated ? <AaboutUs /> : <Navigate to="/login" />}
          />
          <Route
            path="/admin_announcement"
            element={
              isAuthenticated ? <Aannoucement /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/admin_contact"
            element={isAuthenticated ? <Acontact /> : <Navigate to="/login" />}
          />
          <Route
            path="/admin_map"
            element={isAuthenticated ? <Amap /> : <Navigate to="/login" />}
          />
          <Route
            path="/admin_partners"
            element={isAuthenticated ? <Apartner /> : <Navigate to="/login" />}
          />
          <Route
            path="/admin_slideshow"
            element={
              isAuthenticated ? <Aslideshow /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/admin_teams"
            element={isAuthenticated ? <Ateam /> : <Navigate to="/login" />}
          />
          <Route
            path="/admin_activities"
            element={
              isAuthenticated ? <Aactivites /> : <Navigate to="/login" />
            }
          />

          {/* <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/addNewUser" element={<AddUser />} />
          <Route path="/manageUsers" element={<ManageUsers />} />

          <Route path="/adim_about_us" element={<AaboutUs />} />
          <Route path="/admin_announcement" element={<Aannoucement />} />
          <Route path="/admin_contact" element={<Acontact />} />
          <Route path="/admin_map" element={<Amap />} />
          <Route path="/admin_partners" element={<Apartner />} />
          <Route path="/admin_slideshow" element={<Aslideshow />} />
          <Route path="/admin_teams" element={<Ateam />} />
          <Route path="/admin_activities" element={<Aactivites />} /> */}
        </Routes>
      </div>
      <div className="footer-section">{showHeader && <Footer />}</div>
    </div>
  );
};

export default App;
