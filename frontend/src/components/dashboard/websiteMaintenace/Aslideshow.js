import React, { useState } from "react";
import Slidebar from "../partial/Slidebar";
import Main from "../partial/Main";
import "../../../input.css";
import "../../../index.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FirstContact from "./FirstContact";
import SecondContact from "./SecondContact";
import TextSlideShow from "./slideshow/TextSlideShow";
import ImageSlideShow from "./slideshow/ImageSlideShow";

function Aslideshow() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      name: "Text Slideshow",
      content: <TextSlideShow />,
      icon: "ri-text",
    },
    {
      name: "Image Slideshow",
      content: <ImageSlideShow />,
      icon: "ri-image-line",
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

export default Aslideshow;
