import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Slidebar from "../partial/Slidebar";
import Main from "../partial/Main";

const apiUrl = process.env.REACT_APP_APIURL;
const Rdashboard = () => {
  const [userStudent, setUserStudent] = useState([]);
  const [userTeacher, setUserTeacher] = useState([]);
  const [userParent, setUserParent] = useState([]);
  const [userAdmin, setUserAdmin] = useState([]);
  const [userNo, setuserNo] = useState([]);
  const [ourCourse, setOurCourse] = useState([]);
  const [ourCourseAll, setOurCourseAll] = useState([]);
  const [ourCourseToday, setOurCourseToday] = useState([]);
  const [users, setUsers] = useState([]);
  const [usersAll, setUsersAll] = useState([]);
  const [usersToday, setUsersToday] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [alertsAll, setAlertsAll] = useState([]);
  const [alertsToday, setAlertsToday] = useState([]);
  const [classEnrollment, setClassEnrollment] = useState([]);
  const [classEnrollmentToday, setClassEnrollmentToday] = useState([]);

  const getUsersStudent = async () => {
    try {
      const response = await axios.get(`${apiUrl}api/users/getUsersStudent`);

      setUserStudent(response.data);
    } catch (error) {
    } finally {
    }
  };
  const getUsersTeacher = async () => {
    try {
      const response = await axios.get(`${apiUrl}api/users/getUsersTeacher`);

      setUserTeacher(response.data);
    } catch (error) {
    } finally {
    }
  };
  const getUsersAdmin = async () => {
    try {
      const response = await axios.get(`${apiUrl}api/users/getUsersAdmin`);

      setUserAdmin(response.data);
    } catch (error) {
    } finally {
    }
  };
  const getUsersParent = async () => {
    try {
      const response = await axios.get(`${apiUrl}api/users/getUsersParent`);

      setUserParent(response.data);
    } catch (error) {
    } finally {
    }
  };
  const getUsersNo = async () => {
    try {
      const response = await axios.get(`${apiUrl}api/users/getUsersNo`);

      setuserNo(response.data);
    } catch (error) {
    } finally {
    }
  };
  const getUsersActive = async () => {
    try {
      const response = await axios.get(`${apiUrl}api/users/getUsersActive`);

      setUsers(response.data);
    } catch (error) {
    } finally {
    }
  };
  const getUsers = async () => {
    try {
      const response = await axios.get(`${apiUrl}api/users/getUsers`);

      setUsersAll(response.data);
    } catch (error) {
    } finally {
    }
  };
  const getUsersToday = async () => {
    try {
      const response = await axios.get(`${apiUrl}api/users/getUsersToday`);

      setUsersToday(response.data);
    } catch (error) {
    } finally {
    }
  };

  const getCourse = async () => {
    try {
      const response = await axios.get(`${apiUrl}api/course/getCourseStatus`);

      setOurCourse(response.data);
    } catch (error) {
    } finally {
    }
  };
  const getCourseAll = async () => {
    try {
      const response = await axios.get(`${apiUrl}api/course/getCourse`);

      setOurCourseAll(response.data);
    } catch (error) {
    } finally {
    }
  };
  const getCourseToday = async () => {
    try {
      const response = await axios.get(`${apiUrl}api/course/getCourseToday`);

      setOurCourseToday(response.data);
    } catch (error) {
    } finally {
    }
  };
  const getAlerts = async () => {
    try {
      const response = await axios.get(`${apiUrl}api/alert/getAlertStatus`);

      setAlerts(response.data);
    } catch (error) {
    } finally {
    }
  };
  const getAlertsAll = async () => {
    try {
      const response = await axios.get(`${apiUrl}api/alert/getAlertAll`);

      setAlertsAll(response.data);
    } catch (error) {
    } finally {
    }
  };
  const getAlertsToday = async () => {
    try {
      const response = await axios.get(`${apiUrl}api/alert/getAlertToday`);

      setAlertsToday(response.data);
    } catch (error) {
    } finally {
    }
  };
  const getClassEnrollment = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}api/classenrollment/getClassenrollment`
      );

      setClassEnrollment(response.data);
    } catch (error) {
    } finally {
    }
  };
  const getClassEnrollmentToday = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}api/classenrollment/getClassenrollmentToday`
      );

      setClassEnrollmentToday(response.data);
    } catch (error) {
    } finally {
    }
  };
  useEffect(() => {
    getUsersActive();
    getUsers();
    getUsersToday();
    getCourse();
    getCourseAll();
    getCourseToday();
    getAlerts();
    getAlertsAll();
    getAlertsToday();
    getClassEnrollment();
    getClassEnrollmentToday();
    getUsersStudent();
    getUsersTeacher();
    getUsersAdmin();
    getUsersParent();
    getUsersNo();
  }, [apiUrl]);
  return (
    <>
      <Slidebar />
      <Main />
      <div className="ml-72 mr-8 mt-8">
        <div className="flex space-x-4">
          <div className="bg-white shadow-md rounded-lg p-4 w-1/3">
            <i className="ri-group-line text-4xl text-blue-500"></i>
            <h2 className="text-lg font-semibold">Total Users Register</h2>
            <p className="text-2xl font-bold pb-2">{usersAll.length}</p>
            <p>
              <span className="text-blue-500">Active :</span>{" "}
              <span className="font-bold">{users.length}</span>
              <span className="text-green-500"> | Today :</span>{" "}
              <span className="text-blue-800 font-bold">
                {usersToday.length}
              </span>
            </p>
          </div>

          <div className="bg-white shadow-md rounded-lg p-4 w-1/3">
            <i className="ri-git-repository-commits-line text-4xl text-blue-500"></i>
            <h2 className="text-lg font-semibold">Total Courses</h2>
            <p className="text-2xl font-bold pb-2">{ourCourseAll.length}</p>
            <p>
              <span className="text-blue-500">Active :</span>{" "}
              <span className="font-bold">{ourCourse.length}</span>
              <span className="text-green-500"> | Today :</span>{" "}
              <span className="text-blue-800 font-bold">
                {ourCourseToday.length}
              </span>
            </p>
          </div>

          <div className="bg-white shadow-md rounded-lg p-4 w-1/3">
            <i className="ri-community-line text-4xl text-blue-500"></i>
            <h2 className="text-lg font-semibold">Total Classes Enrollment</h2>
            <p className="text-2xl font-bold pb-2">{classEnrollment.length}</p>
            <p className="text-green-500">
              Today Register:{" "}
              <span className="text-blue-800 font-bold">
                {classEnrollmentToday.length}
              </span>
            </p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-4 w-1/3">
            <i className="ri-bell-line text-4xl text-blue-500"></i>
            <h2 className="text-lg font-semibold">Total Alerts</h2>
            <p className="text-2xl font-bold pb-2">{alertsAll.length}</p>
            <p>
              <span className="text-blue-500">Active :</span>{" "}
              <span className="font-bold">{alerts.length}</span>
              <span className="text-green-500"> | Today :</span>{" "}
              <span className="text-blue-800 font-bold">
                {alertsToday.length}
              </span>
            </p>
          </div>
        </div>
        <div className="flex space-x-4 mt-8 pb-8">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-xl font-semibold">Our Users</h2>
                <p className="text-gray-600">Last Users Role</p>
              </div>
              <div>
                <span className="text-xl font-bold">4</span>
                <span className="text-green-500 ml-2">Roles Management</span>
              </div>
            </div>
            <div className="h-72">
              <div className="grid grid-cols-5 gap-4 h-full">
                <div className="flex flex-col justify-end items-center">
                  <span className="font-bold text-blue-500">
                    {userAdmin.length}
                  </span>
                  <div
                    className="bg-blue-500 w-full"
                    style={{ height: `${userAdmin.length}px` }}
                  >
                    {/* {userAdmin.length} */}
                  </div>
                  <span className="mt-2 text-sm font-bold text-green-500">
                    Administrators
                  </span>
                </div>
                <div className="flex flex-col justify-end items-center">
                  <span className="font-bold text-blue-500">
                    {userTeacher.length}
                  </span>
                  <div
                    className="bg-blue-500  w-full"
                    style={{ height: `${userTeacher.length}px` }}
                  >
                    {/* {userTeacher.length} */}
                  </div>
                  <span className="mt-2 text-sm font-bold text-green-500">
                    Teachers
                  </span>
                </div>
                <div className="flex flex-col justify-end items-center">
                  <span className="font-bold text-blue-500">
                    {userStudent.length}
                  </span>
                  <div
                    className="bg-blue-500  w-full"
                    style={{ height: `${userStudent.length}px` }}
                  >
                    {/* {userStudent.length} */}
                  </div>
                  <span className="mt-2 text-sm font-bold text-green-500">
                    Students
                  </span>
                </div>
                <div className="flex flex-col justify-end items-center">
                  <span className="font-bold text-blue-500">
                    {userParent.length}
                  </span>
                  <div
                    className="bg-blue-500  w-full"
                    style={{ height: `${userParent.length}px` }}
                  >
                    {/* {userParent.length} */}
                  </div>
                  <span className="mt-2 text-sm font-bold text-green-500">
                    Parent
                  </span>
                </div>
                <div className="flex flex-col justify-end items-center">
                  <span className="font-bold text-blue-500">
                    {userNo.length}
                  </span>
                  <div
                    className="bg-blue-500  w-full"
                    style={{ height: `${userNo.length}px` }}
                  >
                    {/* {userNo.length} */}
                  </div>
                  <span className="mt-2 text-sm font-bold text-green-500">
                    No Role
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
            <h2 className="text-xl font-semibold mb-4">Our Courses</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="py-2 px-4 bg-blue-500 text-left text-white">
                      Course Name
                    </th>
                    <th className="py-2 px-4 bg-blue-500 text-left text-white">
                      Teacher Name
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {ourCourseAll.map((item) => (
                    <tr key={item._id}>
                      <td className="py-2 px-4 border-b border-gray-200 font-bold text-start">
                        <i className="ri-git-repository-commits-line text-xl">
                          {" "}
                        </i>
                        {item.coursename}{" "}
                        {/* <i class="ri-corner-up-right-double-line text-xl text-blue-500 ps-1"></i> */}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-200 uppercase font-bold text-green-800 text-start">
                        <i class="ri-user-3-line text-xl"> </i>
                        {
                          usersAll.find(
                            (student) => student._id === item.teacherid
                          )?.firstName
                        }{" "}
                        {
                          usersAll.find(
                            (student) => student._id === item.teacherid
                          )?.lastName
                        }
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Rdashboard;
