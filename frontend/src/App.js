import React, { useContext } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Header from "./components/header/Header";
import { UserContext } from "./ctx/UserContextProvider";

const App = () => {
  const { isAuthenticated } = useContext(UserContext);
  return (
    <Router>
      <div className="App">
        <div className="headSection">
          <Header />
        </div>
      </div>
    </Router>
  );
};

export default App;
