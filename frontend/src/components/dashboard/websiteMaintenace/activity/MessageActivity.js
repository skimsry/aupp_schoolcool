import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const apiUrl = process.env.REACT_APP_APIURL;

const MessageActivity = () => {
  const [mannouncement, setMannouncement] = useState([]);
  const getmannouncement = async () => {
    try {
      const response = await axios.get(`${apiUrl}api/activity/getActivity`);
      setMannouncement(response.data);
    } catch (error) {
      console.error("Failed to fetch map data.", error);
    }
  };
  useEffect(() => {
    getmannouncement();
  }, []);
  const handleChange = (e, index) => {
    const { value } = e.target;
    const updatedmannouncement = [...mannouncement];
    updatedmannouncement[index] = {
      ...updatedmannouncement[index],
      text: value,
    };
    setMannouncement(updatedmannouncement);
  };
  const handleSubmit = async (mannouncementId, text) => {
    const emptyFields = mannouncement.filter(
      (mannouncement) => mannouncement.text.trim() === ""
    );
    if (emptyFields.length > 0) {
      toast.error("Cannot empty this field to update.", {
        position: "bottom-right",
        autoClose: 3000,
      });
    } else {
      try {
        const updatedmannouncementData = {
          text: text,
          updateDate: new Date(),
        };
        const response = await axios.put(
          `${apiUrl}api//activity/updateActivity/${mannouncementId}`,
          updatedmannouncementData
        );
        toast.success("Updated successfully.", {
          position: "bottom-right",
          autoClose: 1000,
        });
        getmannouncement();
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
      {mannouncement.map((mannouncement, index) => (
        <div className="mx-auto w-full" key={mannouncement._id}>
          <div className="bg-white overflow-hidden shadow rounded-lg border">
            <div className="px-4 py-5 sm:px-6">
              <div>
                <label
                  for="first_name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Main text to descript Our Activity{" "}
                  <span className="text-red-500">*</span>
                </label>

                <textarea
                  id="message"
                  rows="12"
                  key={mannouncement._id}
                  value={mannouncement.text}
                  onChange={(e) => handleChange(e, index)}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Write your text here..."
                ></textarea>
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={(e) => handleSubmit(mannouncement._id, mannouncement.text)}
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

export default MessageActivity;
