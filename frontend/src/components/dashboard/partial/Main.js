import React, { useState, useContext, useEffect } from "react";
import "../../../input.css";
import "../../../index.css";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../../ctx/UserContextProvider";
//import axios from "axios";
const Main = () => {
  const navigate = useNavigate();
  const path = useLocation();
  const path_dashboard = path.pathname.startsWith("/")
    ? path.pathname.slice(1)
    : path.pathname;
  //const id = path.match(/\/profile\/(.+)/)[1];
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  // const [userById, setUserById] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  const { user, logout } = useContext(UserContext);
  const apiUrl = process.env.REACT_APP_APIURL;
  const fullName = `${user.firstName} ${user.lastName}`;
  const CFullName = fullName.toUpperCase();
  const [showTooltip, setShowTooltip] = useState(false);
  const [showTooltip2, setShowTooltip2] = useState(false);
  // const getUserById = async () => {
  //   try {
  //     const response = await axios.get(
  //       `${apiUrl}api/users/getUsersById/${user._id}`
  //     );
  //     setUserById(response.data);
  //     console.log(userById);
  //     // setFormData({
  //     //   firstName: response.data.firstName,
  //     //   lastName: response.data.lastName,
  //     //   gender: response.data.gender,
  //     //   dob: response.data.dob,
  //     //   fos: response.data.fos,
  //     //   phoneNumber: response.data.phoneNumber,
  //     //   type: response.data.type,
  //     //   email: response.data.email,
  //     //   password: "123!@#thawat",
  //     //   rePassword: "123!@#thawat",
  //     //   status: response.data.status,
  //     //   createdDate: response.data.createdDate,
  //     //   updateDate: response.data.updateDate,
  //     // });
  //   } catch (error) {
  //     setError(error);
  //     setLoading(false);
  //   }
  // };
  useEffect(() => {
    //getUserById();
    // console.log(`${user.firstName}`);
  }, [apiUrl]);

  const handleLogout = () => {
    navigate("/login");
    logout();
  };
  return (
    <main className="fixed left-0 top-0 right-0 w-full md:w-[calc(100%-256px)] md:ml-64 bg-gray-50 transition-all main">
      <div className="py-2 px-6 bg-white flex items-center shadow-md shadow-black/5 sticky top-0 left-0 z-30">
        <button type="button" className="text-lg text-gray-600 sidebar-toggle">
          <i className="ri-home-office-fill"></i>
        </button>
        <ul className="flex items-center text-sm ml-4">
          <li className="mr-2">
            <Link
              to={`/${path_dashboard}`}
              className="text-blue-800 hover:text-gray-600 font-medium capitalize font-bold text-xl"
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
          <li className="dropdown pr-4">
            <p className="capitalize">{CFullName}</p>
          </li>

          {/* <div className="relative">
            <button
              type="button"
              onClick={toggleDropdown}
              onMouseEnter={() => setShowTooltip2(true)}
              onMouseLeave={() => setShowTooltip2(false)}
              className="dropdown-toggle flex items-center"
            >
              <i className="ri-notification-3-line"></i>
            </button>
            {showTooltip2 && (
              <div
                role="tooltip"
                className="absolute right-full top-0 mr-2 z-10 inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm "
              >
                Notification
              </div>
            )}
          </div> */}
          <div className="relative">
            <Link
              to="/admin_alert"
              // onClick={toggleDropdown}
              onMouseEnter={() => setShowTooltip2(true)}
              onMouseLeave={() => setShowTooltip2(false)}
              className="dropdown-toggle flex items-center"
            >
              <i className="ri-notification-3-line"></i>
            </Link>
            {showTooltip2 && (
              <div
                role="tooltip"
                className="absolute right-full top-0 mr-2 z-10 inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm "
              >
                Notification
              </div>
            )}
          </div>
          <li className="dropdown ml-3 relative">
            {/* <button
              type="button"
              onClick={toggleDropdown}
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              className="dropdown-toggle flex items-center"
            >
              
              <i className="ri-user-3-line "></i>
            </button>
            {showTooltip && (
              <div
                id="tooltip-left"
                role="tooltip"
                className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
              >
                Profile Account
                <div className="tooltip-arrow" data-popper-arrow></div>
              </div>
            )} */}
            <div className="relative">
              <button
                type="button"
                onClick={toggleDropdown}
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                className="dropdown-toggle flex items-center"
              >
                <i className="ri-user-3-line "></i>
              </button>
              {showTooltip && (
                <div
                  role="tooltip"
                  className="absolute right-full top-0 mr-1 z-10 inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm "
                >
                  Profile
                </div>
              )}
            </div>
            <ul
              className={`dropdown-menu shadow-md shadow-black/5 z-30 py-1.5 rounded-md bg-white border border-gray-100  absolute right-0 mt-2 w-40 ${
                isDropdownOpen ? "block" : "hidden"
              }`}
            >
              <li>
                <Link
                  to={`/profile/${user._id}`}
                  className=" flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                >
                  Profile
                </Link>
              </li>

              <li>
                <a
                  href="/login"
                  onClick={handleLogout}
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
};

export default Main;
