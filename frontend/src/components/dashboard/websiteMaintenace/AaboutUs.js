import React, { useState } from "react";
import Slidebar from "../partial/Slidebar";
import Main from "../partial/Main";
import "../../../input.css";
import "../../../index.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AaboutUs() {
  return (
    <>
      <Slidebar />
      <Main />
      <div>AaboutUs</div>
    </>
  );
}

export default AaboutUs;
