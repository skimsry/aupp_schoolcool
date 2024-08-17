import React, { useState, useContext, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import "../../../input.css";
import "../../../index.css";
import logo from "../../../assets/schoolcool.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../../ctx/UserContextProvider";
function Slidebar() {
  const navigate = useNavigate();
  const [isOrdersSelected, setIsOrdersSelected] = useState(false);
  const [isWebsiteMaintenaceSelected, setisWebsiteMaintenaceSelected] =
    useState(false);
  const [isSchoolSelected, setisSchoolSelected] = useState(false);
  const [isReportSelected, setisReportSelected] = useState(false);
  const [isSettingSelected, setisSettingSelected] = useState(false);
  const [accessRoute, setAccessRoute] = useState();

  const toggleOrdersMenu = () => {
    setIsOrdersSelected(!isOrdersSelected);
  };
  const toggleWebsiteMaintenacesMenu = () => {
    setisWebsiteMaintenaceSelected(!isWebsiteMaintenaceSelected);
  };
  const toggleSchoolMenu = () => {
    setisSchoolSelected(!isSchoolSelected);
  };
  const toggleReportMenu = () => {
    setisReportSelected(!isReportSelected);
  };
  const toggleSettingMenu = () => {
    setisSettingSelected(!isSettingSelected);
  };
  const location = useLocation();
  const { logout, user } = useContext(UserContext);
  const handleLogout = () => {
    navigate("/login");
    logout();
  };
  const AccessRoute = () => {
    const token = localStorage.getItem("schoolcool-token");
    let userType = null;

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        userType = decodedToken.type;
        setAccessRoute(userType);
      } catch (error) {
        console.error("Token decoding failed:", error);
      }
    }
  };
  useEffect(() => {
    AccessRoute();
  }, []);
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
          {accessRoute === 1 && (
            <>
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
                  className={`pl-7 mt-2 ${
                    isOrdersSelected ? "block" : "hidden"
                  }`}
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
                    isWebsiteMaintenaceSelected
                      ? "bg-gray-950 text-gray-100"
                      : ""
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
                      location.pathname === "/admin_announcement"
                        ? "active"
                        : ""
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
                  <li
                    className={`mb-4 ${
                      location.pathname === "/admin_welcome" ? "active" : ""
                    }`}
                  >
                    <Link
                      to="/admin_welcome"
                      className="text-gray-300 text-sm flex items-center hover:text-gray-100 before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3"
                    >
                      Welcome Dashboard
                    </Link>
                  </li>
                  <li
                    className={`mb-4 ${
                      location.pathname === "/admin_toc" ? "active" : ""
                    }`}
                  >
                    <Link
                      to="/admin_toc"
                      className="text-gray-300 text-sm flex items-center hover:text-gray-100 before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3"
                    >
                      Term of Conditions
                    </Link>
                  </li>
                </ul>
              </li>
            </>
          )}

          <li className="mb-1 group">
            <a
              href="#"
              onClick={toggleSchoolMenu}
              className={`flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md ${
                isSchoolSelected ? "bg-gray-950 text-gray-100" : ""
              } sidebar-dropdown-toggle`}
            >
              <i className="ri-school-line mr-3 text-lg"></i>
              <span className="text-sm">School Management</span>
              <i
                className={`ri-arrow-right-s-line ml-auto ${
                  isSchoolSelected ? "rotate-90" : ""
                }`}
              ></i>
            </a>
            <ul
              className={`pl-7 mt-2 ${isSchoolSelected ? "block" : "hidden"}`}
            >
              {accessRoute === 1 && (
                <>
                  {" "}
                  <li
                    className={`mb-4 ${
                      location.pathname === "/admin_course" ? "active" : ""
                    }`}
                  >
                    <Link
                      to="/admin_course"
                      className="text-gray-300 text-sm flex items-center hover:text-gray-100 before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3"
                    >
                      Manage Course
                    </Link>
                  </li>
                  <li
                    className={`mb-4 ${
                      location.pathname === "/admin_class_enrollment"
                        ? "active"
                        : ""
                    }`}
                  >
                    <Link
                      to="/admin_class_enrollment"
                      className="text-gray-300 text-sm flex items-center hover:text-gray-100 before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3"
                    >
                      Class Enrollment
                    </Link>
                  </li>
                </>
              )}
              {(accessRoute === 1 || accessRoute === 2) && (
                <>
                  <li
                    className={`mb-4 ${
                      location.pathname === "/admin_manage_score"
                        ? "active"
                        : ""
                    }`}
                  >
                    <Link
                      to="/admin_manage_score"
                      className="text-gray-300 text-sm flex items-center hover:text-gray-100 before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3"
                    >
                      Manage Score
                    </Link>
                  </li>
                  <li
                    className={`mb-4 ${
                      location.pathname === "/admin_daily_attendant"
                        ? "active"
                        : ""
                    }`}
                  >
                    <Link
                      to="/admin_daily_attendant"
                      className="text-gray-300 text-sm flex items-center hover:text-gray-100 before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3"
                    >
                      Daily Attendant
                    </Link>
                  </li>
                </>
              )}

              {accessRoute === 1 && (
                <li
                  className={`mb-4 ${
                    location.pathname === "/admin_manage_attendant"
                      ? "active"
                      : ""
                  }`}
                >
                  <Link
                    to="/admin_manage_attendant"
                    className="text-gray-300 text-sm flex items-center hover:text-gray-100 before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3"
                  >
                    Manage Attendant
                  </Link>
                </li>
              )}
              {/* {accessRoute === 1 ||
                (accessRoute === 2 && (
                  <li
                    className={`mb-4 ${
                      location.pathname === "/admin_manage_alert"
                        ? "active"
                        : ""
                    }`}
                  >
                    <Link
                      to="/admin_manage_alert"
                      className="text-gray-300 text-sm flex items-center hover:text-gray-100 before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3"
                    >
                      Manage Alert
                    </Link>
                  </li>
                ))} */}
              {(accessRoute === 1 || accessRoute === 2) && (
                <li
                  className={`mb-4 ${
                    location.pathname === "/admin_manage_alert" ? "active" : ""
                  }`}
                >
                  <Link
                    to="/admin_manage_alert"
                    className="text-gray-300 text-sm flex items-center hover:text-gray-100 before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3"
                  >
                    Manage Alert
                  </Link>
                </li>
              )}

              <li
                className={`mb-4 ${
                  location.pathname === "/admin_alert" ? "active" : ""
                }`}
              >
                <Link
                  to="/admin_alert"
                  className="text-gray-300 text-sm flex items-center hover:text-gray-100 before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3"
                >
                  Alert
                </Link>
              </li>
            </ul>
          </li>
          <li className="mb-1 group">
            <a
              href="#"
              onClick={toggleReportMenu}
              className={`flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md ${
                isReportSelected ? "bg-gray-950 text-gray-100" : ""
              } sidebar-dropdown-toggle`}
            >
              <i className="ri-folder-chart-line mr-3 text-lg"></i>
              <span className="text-sm">Reports</span>
              <i
                className={`ri-arrow-right-s-line ml-auto ${
                  isReportSelected ? "rotate-90" : ""
                }`}
              ></i>
            </a>
            <ul
              className={`pl-7 mt-2 ${isReportSelected ? "block" : "hidden"}`}
            >
              <li
                className={`mb-4 ${
                  location.pathname === "/admin_report_dashboard"
                    ? "active"
                    : ""
                }`}
              >
                <Link
                  to="/admin_report_dashboard"
                  className="text-gray-300 text-sm flex items-center hover:text-gray-100 before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3"
                >
                  Dashboard Reports
                </Link>
              </li>
              {accessRoute === 1 && (
                <>
                  <li
                    className={`mb-4 ${
                      location.pathname === "/admin_report_user" ? "active" : ""
                    }`}
                  >
                    <Link
                      to="/admin_report_user"
                      className="text-gray-300 text-sm flex items-center hover:text-gray-100 before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3"
                    >
                      User
                    </Link>
                  </li>
                  <li
                    className={`mb-4 ${
                      location.pathname === "/admin_report_course"
                        ? "active"
                        : ""
                    }`}
                  >
                    <Link
                      to="/admin_report_course"
                      className="text-gray-300 text-sm flex items-center hover:text-gray-100 before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3"
                    >
                      Course
                    </Link>
                  </li>
                  <li
                    className={`mb-4 ${
                      location.pathname === "/admin_report_class"
                        ? "active"
                        : ""
                    }`}
                  >
                    <Link
                      to="/admin_report_class"
                      className="text-gray-300 text-sm flex items-center hover:text-gray-100 before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3"
                    >
                      Class Enrollment
                    </Link>
                  </li>
                </>
              )}

              <li
                className={`mb-4 ${
                  location.pathname === "/admin_report_score" ? "active" : ""
                }`}
              >
                <Link
                  to="/admin_report_score"
                  className="text-gray-300 text-sm flex items-center hover:text-gray-100 before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3"
                >
                  Score
                </Link>
              </li>
              <li
                className={`mb-4 ${
                  location.pathname === "/admin_report_attendant"
                    ? "active"
                    : ""
                }`}
              >
                <Link
                  to="/admin_report_attendant"
                  className="text-gray-300 text-sm flex items-center hover:text-gray-100 before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3"
                >
                  Attendant
                </Link>
              </li>
              {accessRoute === 1 && (
                <li
                  className={`mb-4 ${
                    location.pathname === "/admin_report_alert" ? "active" : ""
                  }`}
                >
                  <Link
                    to="/admin_report_alert"
                    className="text-gray-300 text-sm flex items-center hover:text-gray-100 before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3"
                  >
                    Alert
                  </Link>
                </li>
              )}
            </ul>
          </li>
          <li className="mb-1 group">
            <a
              href="#"
              onClick={toggleSettingMenu}
              className={`flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md ${
                isSettingSelected ? "bg-gray-950 text-gray-100" : ""
              } sidebar-dropdown-toggle`}
            >
              <i className="ri-settings-2-line mr-3 text-lg"></i>
              <span className="text-sm">Settings</span>
              <i
                className={`ri-arrow-right-s-line ml-auto ${
                  isSettingSelected ? "rotate-90" : ""
                }`}
              ></i>
            </a>
            <ul
              className={`pl-7 mt-2 ${isSettingSelected ? "block" : "hidden"}`}
            >
              <li
                className={`mb-4 ${
                  location.pathname === "/profile" ? "active" : ""
                }`}
              >
                <Link
                  to={`/profile/${user._id}`}
                  className="text-gray-300 text-sm flex items-center hover:text-gray-100 before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3"
                >
                  Profile
                </Link>
              </li>
              <li className={`mb-4`}>
                <Link
                  to="/login"
                  onClick={handleLogout}
                  className="text-gray-300 text-sm flex items-center hover:text-gray-100 before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3"
                >
                  Logout
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div className="fixed top-0 left-0 w-full h-full bg-black/50 z-40 md:hidden sidebar-overlay"></div>
    </>
  );
}

export default Slidebar;
