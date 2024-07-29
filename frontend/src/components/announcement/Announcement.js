import React, { useState, useEffect } from "react";
import announcementBg from "../../assets/announcementBg.png";
import axios from "axios";
import FormattedDate from "../dashboard/FormattedDate";
import Modal from "./Modal";
const apiUrl = process.env.REACT_APP_APIURL;
const Announcement = () => {
  const [titlecover, setTitlecover] = useState([]);
  const [announce, setAnnounce] = useState([]);
  // const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  // const openModal = () => {
  //   setIsModalVisible(true);
  // };

  // const closeModal = () => {
  //   setIsModalVisible(false);
  // };
  const openModal = (announcement) => {
    setSelectedAnnouncement(announcement);
  };

  const closeModal = () => {
    setSelectedAnnouncement(null);
  };
  const getTitlecover = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}api/mannouncement/getMannouncement`
      );
      setTitlecover(response.data);
    } catch (error) {
      console.error("Failed to fetch map data.", error);
    }
  };
  const getAnnounce = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}api/announcement/getAnnouncement`
      );
      setAnnounce(response.data);
    } catch (error) {
      console.error("Failed to fetch map data.", error);
    }
  };
  useEffect(() => {
    getTitlecover();
    getAnnounce();
  }, []);
  return (
    <>
      <div
        className="bg-cover bg-center"
        style={{
          backgroundImage: `url(${announcementBg})`,
          height: "250px",
        }}
      >
        <div className="text-white space-y-2 text-center pt-20">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {" "}
            Our Announcement
          </h2>
          {titlecover.map((item) => (
            <p className="font-serif text-sm dark:text-gray-600" key={item._id}>
              {item.text}
            </p>
          ))}
        </div>
      </div>

      <section className="py-6 sm:py-12 dark:bg-gray-100 dark:text-gray-800">
        <div className="container p-6 mx-auto space-y-8">
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4">
            {announce.map((item) => (
              <article className="flex flex-col dark:bg-gray-50" key={item._id}>
                <a
                  rel="noopener noreferrer"
                  href="#"
                  aria-label="Te nulla oportere reprimique his dolorum"
                >
                  <img
                    alt=""
                    className="object-cover w-full h-52 dark:bg-gray-500"
                    src={item.imgcover}
                  />
                </a>
                <div className="flex flex-col flex-1 p-6">
                  {/* <a
                    rel="noopener noreferrer"
                    href="#"
                    aria-label="Te nulla oportere reprimique his dolorum"
                  ></a> */}

                  <button
                    type="button"
                    onClick={() => openModal(item)}
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Show Detail
                  </button>
                  {selectedAnnouncement &&
                    selectedAnnouncement._id === item._id && (
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
                  <h3 className="flex-1 py-2 text-lg font-semibold leading-snug">
                    {item.title}
                  </h3>
                  <div className="flex flex-wrap justify-between pt-3 space-x-2 text-xs dark:text-gray-600">
                    <span>
                      <FormattedDate date={item.createdDate} />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Announcement;
