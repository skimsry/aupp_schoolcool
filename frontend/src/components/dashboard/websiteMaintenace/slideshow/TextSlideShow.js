import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const apiUrl = process.env.REACT_APP_APIURL;

const TextSlideShow = () => {
  const [tslideshow, setTslideshow] = useState([]);
  const [alert, setAlert] = useState(false);
  const getTslideshow = async () => {
    try {
      const response = await axios.get(`${apiUrl}api/tslideshow/getTslideshow`);
      setTslideshow(response.data);
    } catch (error) {
      console.error("Failed to fetch map data.", error);
    }
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedTslideshow = [...tslideshow];
    updatedTslideshow[index] = { ...updatedTslideshow[index], [name]: value };
    setTslideshow(updatedTslideshow);
  };
  const handleFileChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedTslideshow = [...tslideshow];
        updatedTslideshow[index] = {
          ...updatedTslideshow[index],
          artistprofile: reader.result,
        };
        setTslideshow(updatedTslideshow);
      };
      reader.readAsDataURL(file);
    }
  };
  // const handleEdit = (e) => {
  //   e.preventDefault();
  //   if (!infrontStext || !name) {
  //     toast.error("Cannot have empty fields *.", {
  //       position: "bottom-right",
  //       autoClose: 3000,
  //     });
  //   } else {
  //     setAlert(true);
  //     try {
  //       const response = await axios.put(
  //         `${apiUrl}api/tslideshow/updateTslideshow/${id}`,
  //         {
  //           infrontStext,
  //           name,

  //         }
  //       );

  //       toast.success("Updated successfully.", {
  //         position: "bottom-right",
  //         autoClose: 1000,
  //       });
  //       getTslideshow();
  //     } catch (error) {
  //       toast.error("Cannot update. Please try again.", {
  //         position: "bottom-right",
  //         autoClose: 2000,
  //       });
  //     } finally {
  //       setAlert(false);
  //     }
  //   }
  // };
  const handleEdit = async (item) => {
    const {
      infrontStext,
      infronttext,
      slogantext,
      artistprofile,
      name,
      position,
    } = item;
    if (!infrontStext || !infronttext || !slogantext || !name || !position) {
      toast.error("Cannot have empty fields *.", {
        position: "bottom-right",
        autoClose: 3000,
      });
      return;
    }

    setAlert(true);
    try {
      await axios.put(`${apiUrl}api/tslideshow/updateTslideshow/${item._id}`, {
        infrontStext,
        infronttext,
        slogantext,
        artistprofile,
        name,
        position,
      });
      toast.success("Updated successfully.", {
        position: "bottom-right",
        autoClose: 1000,
      });
      getTslideshow();
    } catch (error) {
      toast.error("Cannot update. Please try again.", {
        position: "bottom-right",
        autoClose: 2000,
      });
    } finally {
      setAlert(false);
    }
  };

  useEffect(() => {
    getTslideshow();
  }, [apiUrl]);
  return (
    <div className="text-left flex items-center justify-center p-12">
      {tslideshow.map((item, index) => (
        <div className="mx-auto w-full" key={index}>
          <div className="bg-white overflow-hidden shadow rounded-lg border">
            <div className="px-4 py-5 sm:px-6">
              <div>
                <label
                  for="first_name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Title of Slideshow Text{" "}
                  <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="infrontStext"
                  name="infrontStext"
                  rows="1"
                  value={item.infrontStext}
                  onChange={(e) => handleChange(e, index)}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Write your text here..."
                ></textarea>
              </div>
              <div>
                <label
                  for="first_name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Subtitle of Slideshow Text{" "}
                  <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="infronttext"
                  name="infronttext"
                  rows="4"
                  value={item.infronttext}
                  onChange={(e) => handleChange(e, index)}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Write your text here..."
                ></textarea>
              </div>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
              <dl className="sm:divide-y sm:divide-gray-200">
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Slogan Text <span className="text-red-500">*</span>
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <textarea
                      id="slogantext"
                      rows="4"
                      name="slogantext"
                      value={item.slogantext}
                      onChange={(e) => handleChange(e, index)}
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Write your text here..."
                    ></textarea>
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Artist Profile <span className="text-red-500">*</span>
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <input
                      type="file"
                      id="artist_profile"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, index)}
                      required
                    />
                  </dd>
                  <dt className="text-sm font-medium text-gray-500"></dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <img
                      src={item.artistprofile}
                      alt="Profile Photo"
                      className="h-30 w-30"
                    />
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Name <span className="text-red-500">*</span>
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <input
                      type="text"
                      id="name"
                      value={item.name}
                      name="name"
                      onChange={(e) => handleChange(e, index)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder=""
                      required
                    />
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Position <span className="text-red-500">*</span>
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <input
                      type="text"
                      id="first_name"
                      name="position"
                      value={item.position}
                      onChange={(e) => handleChange(e, index)}
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
              * Please wait alittle bit. Data is updating...
            </p>
          ) : (
            ""
          )}

          <button
            type="button"
            onClick={() => handleEdit(item)}
            className="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Update
          </button>
          <ToastContainer />
        </div>
      ))}
    </div>
  );
};

export default TextSlideShow;
