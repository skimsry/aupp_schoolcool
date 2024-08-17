import React, { useState } from "react";
import Slidebar from "../partial/Slidebar";
import Main from "../partial/Main";
import "../../../input.css";
import "../../../index.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext, useEffect } from "react";
const apiUrl = process.env.REACT_APP_APIURL;
const CoverToc = () => {
  const [dtoc, setdtoc] = useState([]);
  const getToc = async () => {
    try {
      const response = await axios.get(`${apiUrl}api/toc/getToc`);

      setdtoc(response.data);
    } catch (error) {}
  };
  useEffect(() => {
    getToc();
  }, []);
  const handleChange = (e, index) => {
    const { value } = e.target;
    const updatedText = [...dtoc];
    updatedText[index] = { ...updatedText[index], text: value };
    setdtoc(updatedText);
  };
  const handleSubmit = async (tocId, text) => {
    const emptyFields = dtoc.filter((setdtoc) => setdtoc.text.trim() === "");
    if (emptyFields.length > 0) {
      toast.error("Cannot empty this field to update.", {
        position: "bottom-right",
        autoClose: 3000,
      });
    } else {
      try {
        const updatedTextData = {
          text: text,
          updateDate: new Date(),
        };

        const response = await axios.put(
          `${apiUrl}api/toc/updateToc/${tocId}`,
          updatedTextData
        );

        toast.success("Updated successfully.", {
          position: "bottom-right",
          autoClose: 1000,
        });
        getToc();
      } catch (error) {
        toast.error("Cannot update. Please try again.", {
          position: "bottom-right",
          autoClose: 2000,
        });
      } finally {
      }
    }
  };
  return (
    <div className="text-left flex items-center justify-center p-12">
      {dtoc.map((dtoc, index) => (
        <div className="mx-auto w-full" key={dtoc._id}>
          <div className="bg-white overflow-hidden shadow rounded-lg border">
            <div className="px-4 py-5 sm:px-6">
              <div>
                <label
                  for="first_name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Content of Terms and Conditions{" "}
                  <span className="text-red-500">*</span>
                </label>

                <textarea
                  id="message"
                  rows="12"
                  key={dtoc._id}
                  value={dtoc.text}
                  onChange={(e) => handleChange(e, index)}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Write your text here..."
                ></textarea>
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={(e) => handleSubmit(dtoc._id, dtoc.text)}
            className="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Update
          </button>
        </div>
      ))}
      <ToastContainer />
    </div>
  );
};
function Atoc() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      name: "Terms and Conditions",
      content: <CoverToc />,
      icon: "ri-t-box-line",
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

export default Atoc;
