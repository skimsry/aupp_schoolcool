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
// import { UserContext } from "./ctx/UserContextProvider";

// const App = () => {
//   const { isAuthenticated } = useContext(UserContext);
//   const location = useLocation();
//   const showHeader = ![
//     "/",
//     "/announcement",
//     "/about_us",
//     "/contact",
//     "/login",
//     "/signup",
//   ].includes(location.pathname);
//   return (
//     <Router>
//       <div className="App">
//         <div className="header-section">{showHeader && <Header />}</div>
//         <div className="container">
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/announcement" element={<Announcement />} />
//             <Route path="/about_us" element={<AboutUs />} />
//             <Route path="/contact" element={<Contact />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/signup" element={<Signup />} />
//             <Route
//               path="/dashboard"
//               element={
//                 isAuthenticated ? <Dashboard /> : <Navigate to="/login" />
//               }
//             />
//           </Routes>
//         </div>
//         <div className="footer-section">{showHeader && <Footer />}</div>
//       </div>
//     </Router>
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
  //console.log("Is Authenticated2:", isAuthenticated);
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
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/dashboard"
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
      <div className="footer-section">{showHeader && <Footer />}</div>
    </div>
  );
};

export default App;
