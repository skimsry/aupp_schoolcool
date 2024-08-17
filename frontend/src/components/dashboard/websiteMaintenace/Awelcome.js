import React, { useState, useEffect, useRef } from "react";
import Slidebar from "../partial/Slidebar";
import Main from "../partial/Main";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import FormattedDate from "../FormattedDate";
import DeleteConfirm from "../userManagement/DeleteConfirm";
const apiUrl = process.env.REACT_APP_APIURL;

const Welcome = () => {
  const [profileimg, setProfileimg] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState(false);
  const [alert, setAlert] = useState(false);
  //   const [position, setPosition] = useState("");
  const fileInputRef = useRef(null);
  //   const [teams, setTeams] = useState([]);
  //   const [editteam, setEditteam] = useState(false);
  const [currentTeamId, setCurrentTeamId] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  //   const [searchResults, setSearchResults] = useState([]);
  //   const [currentPage, setCurrentPage] = useState(1);
  //   const [searchQuery, setSearchQuery] = useState("");
  //   const teamsPerPage = 5;
  const [dwelcome, setDwelcome] = useState([]);
  const getWelcome = async () => {
    try {
      const response = await axios.get(`${apiUrl}api/welcome/getWelcome`);

      setDwelcome(response.data);
      if (response.data.length > 0) {
        setSelectedItem(response.data[0]);
        setCurrentTeamId(response.data[0]._id);
        setTitle(response.data[0].title);
        setContent(response.data[0].content);
        setProfileimg(response.data[0].coverimg);
      }
    } catch (error) {
      console.error("Error fetching welcome data:", error);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    //code here
  };

  const handleFileChange = (e) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileimg(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!profileimg || !title || !content) {
      toast.error("Cannot have empty fields *.", {
        position: "bottom-right",
        autoClose: 3000,
      });
    } else {
      setAlert(true);
      try {
        const response = await axios.put(
          `${apiUrl}api/welcome/updateWelcome/${currentTeamId}`,
          {
            title,
            content,
            coverimg: profileimg,
          }
        );

        toast.success("Updated successfully.", {
          position: "bottom-right",
          autoClose: 1000,
        });
        getWelcome();
      } catch (error) {
        toast.error("Cannot update. Please try again.", {
          position: "bottom-right",
          autoClose: 2000,
        });
      } finally {
        setAlert(false);
      }
    }
  };
  useEffect(() => {
    getWelcome();
  }, [apiUrl]);
  return (
    <>
      <Slidebar />
      <Main />
      {dwelcome.map((item) => (
        <div
          className="text-left flex items-center justify-center p-12"
          key={item._id}
        >
          <div className="mx-auto w-full">
            <div className="bg-white overflow-hidden shadow rounded-lg border">
              <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                <dl className="sm:divide-y sm:divide-gray-200">
                  <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Cover Image{" "}
                      <span className="text-red-500">* (1920px X 1080px)</span>
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <input
                        class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        id="multiple_files"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        type="file"
                        multiple
                      />
                      <img src={profileimg || item.coverimg} alt="Cover" />
                    </dd>
                  </div>
                  <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Title <span className="text-red-500">*</span>
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <input
                        type="text"
                        id="first_name"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder=""
                        required
                      />
                    </dd>
                  </div>
                  <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Content <span className="text-red-500">*</span>
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <textarea
                        type="text"
                        id="first_name"
                        rows={10}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder=""
                        required
                      />
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
            {alert ? (
              <p className="text-red-500 pt-4">
                * Please wait less than 3 minutes. Because of upload profile
                image....
              </p>
            ) : (
              ""
            )}

            <button
              type="button"
              onClick={handleUpdate}
              className="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Update
            </button>
          </div>
          <ToastContainer />
        </div>
      ))}
    </>
  );
};
function Awelcome() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { name: "Welcome Admin", content: <Welcome />, icon: "ri-vimeo-fill" },
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

export default Awelcome;
