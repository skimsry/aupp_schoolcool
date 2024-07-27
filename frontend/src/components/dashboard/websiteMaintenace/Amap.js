import React, { useState, useEffect } from "react";
import Slidebar from "../partial/Slidebar";
import Main from "../partial/Main";
import "../../../input.css";
import "../../../index.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Map from "../../home/Map";
const apiUrl = process.env.REACT_APP_APIURL;

function Amap() {
  const [showMap, setShowMap] = useState([]);
  const [formData, setFormData] = useState();
  const getMap = async () => {
    try {
      const response = await axios.get(`${apiUrl}api/map/getMap`);
      setShowMap(response.data);
      // setLoading(false);
    } catch (error) {
      // setError(error);
      // setLoading(false);
    }
  };
  // const handleChange = (e) => {
  //   // const { fmap } = e.target;
  //   setFormData(e.target);
  // };
  const handleChange = (e, index) => {
    const { value } = e.target;
    const updatedMap = [...showMap];
    updatedMap[index] = { ...updatedMap[index], linkMap: value };
    setShowMap(updatedMap);
  };
  useEffect(() => {
    getMap();
  }, [apiUrl]);
  return (
    <>
      <Slidebar />
      <Main />
      <div className="ml-72 mr-8">
        <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white text-left">
          How to update Map Location:
        </h2>
        <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400 text-left mb-4">
          <li>Go to Google Maps and find the location you want. </li>
          <li>Click on "Share" and then "Embed a map."</li>
          <li>Copy the src from iframe code provided and paste it.</li>
        </ul>
        {showMap.map((maps, index) => (
          <form className="flex items-center mb-4" key={maps._id}>
            <label for="simple-search" className="sr-only">
              Search
            </label>
            <div className="relative w-full">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 11c1.656 0 3-1.344 3-3S13.656 5 12 5s-3 1.344-3 3 1.344 3 3 3zM12 2a7 7 0 017 7c0 5.25-7 13-7 13S5 14.25 5 9a7 7 0 017-7z"
                  />
                </svg>
              </div>

              <input
                type="text"
                id="simple-search"
                value={maps.linkMap}
                onChange={(e) => handleChange(e, index)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search map on google"
                required
              />
            </div>
            <button
              type="submit"
              className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2zM7 3v4h4V3M7 15h10"
                />
              </svg>

              <span className="sr-only">Save</span>
            </button>
          </form>
        ))}

        <Map />
      </div>
    </>
  );
}

export default Amap;
