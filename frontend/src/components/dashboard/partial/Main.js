import React, { useState } from "react";
import "../../../input.css";
import "../../../index.css";
import { useLocation, Link } from "react-router-dom";
function Main() {
  const path = useLocation();
  const path_dashboard = path.pathname.startsWith("/")
    ? path.pathname.slice(1)
    : path.pathname;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  return (
    <main
      className="w-full md:w-[calc(100%-256px)] md:ml-64 bg-gray-50 transition-all main"
      style={{ marginTop: "-60px" }}
    >
      <div className="py-2 px-6 bg-white flex items-center shadow-md shadow-black/5 sticky top-0 left-0 z-30">
        <button type="button" className="text-lg text-gray-600 sidebar-toggle">
          <i class="ri-home-office-fill"></i>
        </button>
        <ul className="flex items-center text-sm ml-4">
          <li className="mr-2">
            <Link
              to={`/${path_dashboard}`}
              className="text-gray-400 hover:text-gray-600 font-medium capitalize"
            >
              {path_dashboard}
            </Link>
          </li>
          {/* <li className="text-gray-600 mr-2 font-medium">/</li>
          <li className="text-gray-600 mr-2 font-medium capitalize">
            {path_dashboard}
          </li> */}
        </ul>
        <ul className="ml-auto flex items-center">
          <li className="dropdown">
            <button
              type="button"
              className="dropdown-toggle text-gray-400 w-8 h-8 rounded flex items-center justify-center hover:bg-gray-50 hover:text-gray-600"
            >
              <i className="ri-notification-3-line"></i>
            </button>
          </li>

          <li className="dropdown ml-3 relative">
            <button
              type="button"
              onClick={toggleDropdown}
              className="dropdown-toggle flex items-center"
            >
              <img
                src="https://placehold.co/32x32"
                alt=""
                className="w-8 h-8 rounded block object-cover align-middle"
              />
            </button>
            <ul
              className={`dropdown-menu shadow-md shadow-black/5 z-30 py-1.5 rounded-md bg-white border border-gray-100 w-full max-w-[140px] absolute right-0 mt-2 w-40 ${
                isDropdownOpen ? "block" : "hidden"
              }`}
            >
              <li>
                <a
                  href="#"
                  className=" flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                >
                  Profile
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                >
                  Settings
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                >
                  Logout
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </main>
  );
}

export default Main;
