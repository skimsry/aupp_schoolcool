import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./components/home/Home";
import Announcement from "./components/announcement/Announcement";
import AboutUs from "./components/aboutUs/AboutUs";
import Contact from "./components/contact/Contact";
import Login from "./components/login/Login";
import SignupClient from "./components/signup/SignupClient";
import Dashboard from "./components/dashboard/partial/Dashboard";

const App = () => {
  return (
    <Router>
      <div className="App">
        <div className="header-section">
          <Header />
        </div>
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/announcement" element={<Announcement />} />
            <Route path="/about_us" element={<AboutUs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup_client" element={<SignupClient />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
        <div className="footer-section">
          <Footer />
        </div>
      </div>
    </Router>
  );
};

export default App;
