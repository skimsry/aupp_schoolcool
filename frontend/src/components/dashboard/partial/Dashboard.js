import React from "react";
import Slidebar from "./Slidebar";
import Main from "./Main";
import "../../../input.css";
import "../../../index.css";

import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../../ctx/UserContextProvider";

function Dashboard() {
  const { user, token } = useContext(UserContext);
  //const { isAuthenticated } = useContext(UserContext);
  console.log(user);
  // useEffect(() => {
  //   //const user = JSON.parse(localStorage.getItem("schoolcool-user"));
  //   // Load the token from localStorage
  //   //const token = localStorage.getItem("schoolcool-token");
  //   if (user && token) {
  //     // setUser(JSON.parse(user)); //some change
  //     // setUser(user);
  //     // setIsAuthenticated(true);
  //     // setToken(token);
  //     //console.log("ok");
  //   } else {
  //     // setIsAuthenticated(false);
  //     //  console.log("no");
  //   }
  // }, []);
  useEffect(() => {
    const token = localStorage.getItem("schoolcool-user");
    if (token) {
      //isAuthenticated(true);
    }
  }, []);

  return (
    <>
      <Slidebar />
      <Main />
    </>
  );
}

export default Dashboard;
