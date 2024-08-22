import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "../announcement/Modal";
const apiUrl = process.env.REACT_APP_APIURL;
const Activities = () => {
  const [activity, setActivity] = useState([]);
  const [mactivity, setMactivity] = useState([]);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const getActivity = async () => {
    try {
      const response = await axios.get(`${apiUrl}api/activities/getActivities`);

      setActivity(response.data);
    } catch (error) {}
  };
  const getMactivity = async () => {
    try {
      const response = await axios.get(`${apiUrl}api/activity/getActivity`);

      setMactivity(response.data);
    } catch (error) {}
  };
  const truncateContent = (content, wordLimit) => {
    const words = content.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return content;
  };
  const openModal = (announcement) => {
    setSelectedAnnouncement(announcement);
  };

  const closeModal = () => {
    setSelectedAnnouncement(null);
  };
  useEffect(() => {
    getActivity();
    getMactivity();
  }, [apiUrl]);

  return (
    <div className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-blue-800 sm:text-4xl">
            From the activities
          </h2>
          {mactivity.map((item, index) => (
            <p key={index} className="mt-2 text-lg leading-8 text-gray-600">
              {item.text}
            </p>
          ))}
        </div>
        <div className="text-left mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {activity.map((activity, index) => (
            <div
              key={index}
              className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
            >
              <a href="#" onClick={() => openModal(activity)}>
                <img className="rounded-t-lg" alt="" src={activity.imgcover} />
              </a>
              <div className="p-5">
                <a href="#" onClick={() => openModal(activity)}>
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {activity.title}
                  </h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  {truncateContent(activity.content, 8)}
                </p>
                <a
                  href="#"
                  onClick={() => openModal(activity)}
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Read more
                  <svg
                    className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </a>
              </div>
              {selectedAnnouncement &&
                selectedAnnouncement._id === activity._id && (
                  <Modal isVisible={true} onClose={closeModal}>
                    <div className="p-6 bg-white rounded-lg shadow-lg flex flex-col items-center">
                      <img
                        src={selectedAnnouncement.imgcover}
                        alt="Cover image"
                        className="w-1/2 h-64 object-cover rounded-lg mb-4"
                      />
                      <h2 className="text-2xl font-bold mb-4 text-gray-800">
                        {selectedAnnouncement.title}
                      </h2>
                      <p className="mb-4 text-gray-700">
                        {selectedAnnouncement.content}
                      </p>
                      <button
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
                        onClick={closeModal}
                      >
                        Close Modal
                      </button>
                    </div>
                  </Modal>
                )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Activities;
