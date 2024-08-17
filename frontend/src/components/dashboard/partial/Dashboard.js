import React, { useEffect, useState } from "react";
import Slidebar from "./Slidebar";
import Main from "./Main";
import "../../../input.css";
import "../../../index.css";
import { Link } from "react-router-dom";
import WelcomeBack from "../../../assets/Welcome-Back.jpg";
import axios from "axios";
const apiUrl = process.env.REACT_APP_APIURL;
function Dashboard() {
  const [dwelcome, setDwelcome] = useState([]);
  const getWelcome = async () => {
    try {
      const response = await axios.get(`${apiUrl}api/welcome/getWelcome`);

      setDwelcome(response.data);
    } catch (error) {}
  };
  useEffect(() => {
    getWelcome();
  }, []);
  return (
    <>
      <Slidebar />
      <Main />
      <div className="ml-72 mr-8 mt-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        {dwelcome.map((dwelcome) => (
          <>
            <div className="p-5">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {dwelcome.title}
              </h5>

              <p
                className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-justify"
                style={{ textIndent: "2em" }}
              >
                {dwelcome.content}
              </p>
              <Link
                to="/"
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Our Website
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
              </Link>
            </div>
            <img className="rounded-t-lg" src={dwelcome.coverimg} alt="" />
          </>
        ))}
      </div>
    </>
  );
}

export default Dashboard;
