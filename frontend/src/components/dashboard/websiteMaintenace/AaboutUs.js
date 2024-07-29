import React, { useState } from "react";
import Slidebar from "../partial/Slidebar";
import Main from "../partial/Main";
import "../../../input.css";
import "../../../index.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Career from "./about_us/Career";
import History from "./about_us/History";
import License from "./about_us/License";
import Mission from "./about_us/Mission";
import Vision from "./about_us/Vision";
import CoverAboutus from "./about_us/CoverAboutus";

function AaboutUs() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      name: "Cover Text",
      content: <CoverAboutus />,
      icon: "ri-t-box-line",
    },
    {
      name: "History",
      content: <History />,
      icon: "ri-history-fill",
    },
    { name: "Vision", content: <Vision />, icon: "ri-tv-2-line" },
    { name: "Mission", content: <Mission />, icon: "ri-file-line" },
    {
      name: "Career Oportunities",
      content: <Career />,
      icon: "ri-profile-fill",
    },
    {
      name: "License and Accreditation",
      content: <License />,
      icon: "ri-honour-line",
    },
  ];
  return (
    <>
      <Slidebar />
      <Main />
      <div className="ml-72 mr-8">
        <div className="flex border-b border-gray-200">
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`px-4 py-2 transition-colors duration-300 ${
                activeTab === index
                  ? "border-b-2 border-blue-500 text-blue-500"
                  : "border-b-2 border-transparent text-gray-500 hover:text-blue-500"
              }`}
              onClick={() => setActiveTab(index)}
            >
              <i className={`${tab.icon} mr-2`}></i> {tab.name}
            </button>
          ))}
        </div>
        <div className="p-4">{tabs[activeTab].content}</div>
      </div>
    </>
  );
}

export default AaboutUs;
