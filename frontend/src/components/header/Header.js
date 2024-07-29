import React, { useContext, useEffect } from "react";
import "../../input.css";
import "../../index.css";
import "../../components/header/header.css";
import logo from "../../assets/schoolcool.png";
import { Link, useLocation } from "react-router-dom";
import { UserContext } from "../../ctx/UserContextProvider";
const apiUrl = process.env.REACT_APP_APIURL;
const Header = () => {
  const { showContact, setShowContact, getContact } = useContext(UserContext);
  const location = useLocation();
  useEffect(() => {
    getContact();
  }, [apiUrl]);
  return (
    <div className="fixed-header">
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src={logo} className="h-12" alt="SchoolCool Logo" />
            <span className="self-center text-4xl font-semibold whitespace-nowrap dark:text-white anton-regular text-[#003070]">
              SchoolCool
            </span>
          </Link>
          <div className="flex items-center space-x-6 rtl:space-x-reverse">
            {showContact.map((fcontact) => (
              <a
                href="#"
                key={fcontact._id}
                className="text-sm  text-gray-500 dark:text-white hover:underline"
              >
                {fcontact.phone}
              </a>
            ))}

            <Link
              to="/signup"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Sign Up
            </Link>
            <Link
              to="/login"
              className="text-sm  text-blue-600 dark:text-blue-500 hover:underline"
            >
              Login
            </Link>
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
                  className={`hover:bg-[#003070] rounded px-2 py-1 hover:text-white ${
                    location.pathname === "/"
                      ? "bg-[#003070] rounded text-white"
                      : ""
                  }`}
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/announcement"
                  className={`hover:bg-[#003070] rounded px-2 py-1 hover:text-white ${
                    location.pathname === "/announcement"
                      ? "bg-[#003070] rounded text-white"
                      : ""
                  }`}
                >
                  Announcement
                </Link>
              </li>
              <li>
                <Link
                  to="/about_us"
                  className={`hover:bg-[#003070] rounded px-2 py-1 hover:text-white ${
                    location.pathname === "/about_us"
                      ? "bg-[#003070] rounded text-white"
                      : ""
                  }`}
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className={`hover:bg-[#003070] rounded px-2 py-1 hover:text-white ${
                    location.pathname === "/contact"
                      ? "bg-[#003070] rounded text-white"
                      : ""
                  }`}
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
