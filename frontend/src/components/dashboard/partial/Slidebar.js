import React, { useState } from "react";
import "../../../input.css";
import "../../../index.css";
import logo from "../../../assets/schoolcool.png";
import { Link, useLocation } from "react-router-dom";
function Slidebar() {
  const [isOrdersSelected, setIsOrdersSelected] = useState(false);
  const [isWebsiteMaintenaceSelected, setisWebsiteMaintenaceSelected] =
    useState(false);

  const toggleOrdersMenu = () => {
    setIsOrdersSelected(!isOrdersSelected);
  };
  const toggleWebsiteMaintenacesMenu = () => {
    setisWebsiteMaintenaceSelected(!isWebsiteMaintenaceSelected);
  };
  const location = useLocation();
  return (
    <>
      <div className="fixed left-0 top-0 w-64 h-full bg-gray-900 p-4 z-50 sidebar-menu transition-transform">
        <Link
          to="/"
          className="flex items-center pb-4 border-b border-b-gray-800"
        >
          <img
            src={logo}
            alt="schoolcool logo"
            className="w-8 h-8 rounded object-cover"
          />
          <span className="text-lg font-bold text-white ml-3 whitespace-nowrap">
            SchoolCool
          </span>
        </Link>
        <ul className="mt-4">
          <li
            className={`mb-1 group ${
              location.pathname === "/dashboard" ? "active" : ""
            }`}
          >
            <Link
              to="/dashboard"
              className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100"
            >
              <i className="ri-home-2-line mr-3 text-lg"></i>
              <span className="text-sm">Dashboard</span>
            </Link>
          </li>
          <li className="mb-1 group">
            <a
              href="#"
              onClick={toggleOrdersMenu}
              className={`flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md ${
                isOrdersSelected ? "bg-gray-950 text-gray-100" : ""
              } sidebar-dropdown-toggle`}
            >
              <i className="ri-group-line mr-3 text-lg"></i>
              <span className="text-sm">Users Management</span>
              <i
                className={`ri-arrow-right-s-line ml-auto ${
                  isOrdersSelected ? "rotate-90" : ""
                }`}
              ></i>
            </a>
            <ul
              className={`pl-7 mt-2 ${isOrdersSelected ? "block" : "hidden"}`}
            >
              <li
                className={`mb-4 ${
                  location.pathname === "/addNewUser" ? "active" : ""
                }`}
              >
                <Link
                  to="/addNewUser"
                  className="text-gray-300 text-sm flex items-center hover:text-gray-100 before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3"
                >
                  Add User
                </Link>
              </li>
              <li
                className={`mb-4 ${
                  location.pathname === "/manageUsers" ? "active" : ""
                }`}
              >
                <Link
                  to="/manageUsers"
                  className="text-gray-300 text-sm flex items-center hover:text-gray-100 before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3"
                >
                  Manage Users
                </Link>
              </li>
            </ul>
          </li>
          <li className="mb-1 group">
            <a
              href="#"
              onClick={toggleWebsiteMaintenacesMenu}
              className={`flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md ${
                isWebsiteMaintenaceSelected ? "bg-gray-950 text-gray-100" : ""
              } sidebar-dropdown-toggle`}
            >
              <i className="ri-pages-line mr-3 text-lg"></i>
              <span className="text-sm">Website Maintenance</span>
              <i
                className={`ri-arrow-right-s-line ml-auto ${
                  isWebsiteMaintenaceSelected ? "rotate-90" : ""
                }`}
              ></i>
            </a>
            <ul
              className={`pl-7 mt-2 ${
                isWebsiteMaintenaceSelected ? "block" : "hidden"
              }`}
            >
              <li
                className={`mb-4 ${
                  location.pathname === "/admin_slideshow" ? "active" : ""
                }`}
              >
                <Link
                  to="/admin_slideshow"
                  className="text-gray-300 text-sm flex items-center hover:text-gray-100 before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3"
                >
                  Home Slideshow
                </Link>
              </li>
              <li
                className={`mb-4 ${
                  location.pathname === "/admin_activities" ? "active" : ""
                }`}
              >
                <Link
                  to="/admin_activities"
                  className="text-gray-300 text-sm flex items-center hover:text-gray-100 before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3"
                >
                  Our Activities
                </Link>
              </li>
              <li
                className={`mb-4 ${
                  location.pathname === "/admin_announcement" ? "active" : ""
                }`}
              >
                <Link
                  to="/admin_announcement"
                  className="text-gray-300 text-sm flex items-center hover:text-gray-100 before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3"
                >
                  Our Announcement
                </Link>
              </li>
              <li
                className={`mb-4 ${
                  location.pathname === "/admin_teams" ? "active" : ""
                }`}
              >
                <Link
                  to="/admin_teams"
                  className="text-gray-300 text-sm flex items-center hover:text-gray-100 before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3"
                >
                  Our Teams
                </Link>
              </li>
              <li
                className={`mb-4 ${
                  location.pathname === "/admin_partners" ? "active" : ""
                }`}
              >
                <Link
                  to="/admin_partners"
                  className="text-gray-300 text-sm flex items-center hover:text-gray-100 before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3"
                >
                  Our Partner
                </Link>
              </li>
              <li
                className={`mb-4 ${
                  location.pathname === "/adim_about_us" ? "active" : ""
                }`}
              >
                <Link
                  to="/adim_about_us"
                  className="text-gray-300 text-sm flex items-center hover:text-gray-100 before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3"
                >
                  About Us
                </Link>
              </li>
              <li
                className={`mb-4 ${
                  location.pathname === "/admin_contact" ? "active" : ""
                }`}
              >
                <Link
                  to="/admin_contact"
                  className="text-gray-300 text-sm flex items-center hover:text-gray-100 before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3"
                >
                  Contact
                </Link>
              </li>
              <li
                className={`mb-4 ${
                  location.pathname === "/admin_map" ? "active" : ""
                }`}
              >
                <Link
                  to="/admin_map"
                  className="text-gray-300 text-sm flex items-center hover:text-gray-100 before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3"
                >
                  Map Location
                </Link>
              </li>
            </ul>
          </li>
          <li className="mb-1 group">
            <a
              href="#"
              className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100"
            >
              <i className="ri-settings-2-line mr-3 text-lg"></i>
              <span className="text-sm">Settings</span>
            </a>
          </li>
        </ul>
      </div>
      <div className="fixed top-0 left-0 w-full h-full bg-black/50 z-40 md:hidden sidebar-overlay"></div>
    </>
  );
}

export default Slidebar;
