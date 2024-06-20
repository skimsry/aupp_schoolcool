import React, { useContext } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./components/home/Home";
import { UserContext } from "./ctx/UserContextProvider";

const App = () => {
  const { isAuthenticated } = useContext(UserContext);
  return (
    <Router>
      <div className="App">
        <div className="headSection">
          <Header />
          <Home />
          <Footer />
        </div>
      </div>
    </Router>
  );
};

export default App;
