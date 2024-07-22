import React from "react";
import Slidebar from "./Slidebar";
import Main from "./Main";
import "../../../input.css";
import "../../../index.css";
import { Link } from "react-router-dom";
import WelcomeBack from "../../../assets/Welcome-Back.jpg";
function Dashboard() {
  return (
    <>
      <Slidebar />
      <Main />
      <div className="ml-72 mr-8 mt-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="p-5">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Welcome to SchoolCool's Application Portal!
          </h5>

          <p
            className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-justify"
            style={{ textIndent: "2em" }}
          >
            We are thrilled that you are considering joining our vibrant and
            dynamic community. At SchoolCool, we are committed to providing an
            exceptional educational experience that nurtures both academic
            excellence and personal growth. Our dedicated faculty,
            state-of-the-art facilities, and diverse extracurricular programs
            ensure that each student can thrive and reach their full potential.
            We look forward to receiving your application and embarking on this
            exciting journey together!
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
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </Link>
        </div>
        <img className="rounded-t-lg" src={WelcomeBack} alt="" />
      </div>
    </>
  );
}

export default Dashboard;
