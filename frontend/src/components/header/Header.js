import React from "react";
import "../../input.css";
import "../../index.css";
import "../../components/header/header.css";
import logo from "../../assets/schoolcool.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="fixed-header">
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          <a
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src={logo} className="h-12" alt="SchoolCool Logo" />
            <span className="self-center text-4xl font-semibold whitespace-nowrap dark:text-white anton-regular text-[#003070]">
              SchoolCool
            </span>
          </a>
          <div className="flex items-center space-x-6 rtl:space-x-reverse">
            <a
              href="tel:016571913"
              className="text-sm  text-gray-500 dark:text-white hover:underline"
            >
              (+855) 16 571 913
            </a>
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Sign Up
            </button>
            <a
              href="#"
              className="text-sm  text-blue-600 dark:text-blue-500 hover:underline"
            >
              Login
            </a>
          </div>
        </div>
      </nav>
      <nav className="bg-gray-50 dark:bg-gray-700">
        <div className="max-w-screen-xl px-4 py-3 mx-auto">
          <div className="flex items-center">
            <ul className="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
              <li>
                <Link
                  to="/"
                  className="hover:bg-[#003070] rounded px-2 py-1 hover:text-white"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/announcement"
                  className="hover:bg-[#003070] rounded px-2 py-1 hover:text-white"
                >
                  Announcement
                </Link>
              </li>
              <li>
                <Link
                  to="/about_us"
                  className="hover:bg-[#003070] rounded px-2 py-1 hover:text-white"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:bg-[#003070] rounded px-2 py-1 hover:text-white"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
