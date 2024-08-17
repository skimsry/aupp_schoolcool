import React, { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormattedDate from "../FormattedDate";
import Slidebar from "../partial/Slidebar";
import Main from "../partial/Main";
import logo from "../../../assets/schoolcool.png";
import { UserContext } from "../../../ctx/UserContextProvider";
import { utils, writeFile } from "xlsx";
const apiUrl = process.env.REACT_APP_APIURL;
const Rattendant = () => {
  const sdateInputRef = useRef(null);
  const edateInputRef = useRef(null);
  const getFormattedDate = (date) => {
    return date.toISOString().split("T")[0];
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB");
  };
  const [formData, setFormData] = useState({
    courseId: "",
    student_id: "",
    isattend: "",
    sDate: getFormattedDate(new Date()),
    eDate: getFormattedDate(new Date()),
  });
  const [showReport, setShowReport] = useState(true);
  const [attendants, getAttendants] = useState([]);
  const [userStudent, setUserStudent] = useState([]);
  const [userTeacher, setUserTeacher] = useState([]);
  const [ourCourse, setOurCourse] = useState([]);
  const [classStudent, setclassStudent] = useState([]);
  // const { user } = useContext(UserContext);
  // const UserID = user._id;
  // const UserType = user.type;
  const { user, token } = useContext(UserContext);
  const UserID = user._id;
  const decodedToken = jwtDecode(token);
  const UserType = decodedToken.type;
  const UserFOS = decodedToken.fos;
  const [classEnrollment, setClassEnrollment] = useState([]);
  const [data, setData] = useState();

  const getTeacher = async () => {
    try {
      const response = await axios.get(`${apiUrl}api/users/getUsersTeacher`);

      setUserTeacher(response.data);
    } catch (error) {
    } finally {
    }
  };
  const printReport = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Open a new window with full viewport size
    const printWindow = window.open(
      "",
      "",
      `width=${width},height=${height},scrollbars=yes`
    );
    const reportContent = document.getElementById("report").innerHTML;

    printWindow.document.close();
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Report</title>
          <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
          <style>
            body { font-family: Arial, sans-serif; }
            @media print {
              .no-print { display: none; }
            }
          </style>
        </head>
        <body>
          ${reportContent}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };
  const exportToExcel = () => {
    const table = document.querySelector("#report");
    const ws = utils.table_to_sheet(table);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Attendant Management Report");
    writeFile(wb, "Attendant_Management_Report.xlsx");
  };
  const handleSubmit = async () => {
    if (UserType === 2) {
      if (!formData.courseId) {
        toast.error("Please select your course!", {
          position: "bottom-right",
          autoClose: 2000,
        });
        return;
      }
    }
    setShowReport(true);
    try {
      let startDate = null;
      let endDate = null;

      if (formData.sDate) {
        startDate = new Date(formData.sDate);
      }

      if (formData.eDate) {
        endDate = new Date(formData.eDate);
        endDate.setDate(endDate.getDate() + 1);
      }

      if (startDate && endDate && startDate > endDate) {
        toast.error("Start Date cannot be greater than End Date.", {
          position: "bottom-right",
          autoClose: 2000,
        });
        return;
      }

      const response = await axios.get(
        `${apiUrl}api/attendent/getAttendantByCriteria2`,
        {
          params: {
            course_id: formData.courseId,
            student_id: formData.student_id,
            isattend: formData.isattend,
            startDate,
            endDate,
          },
        }
      );
      getAttendants(response.data);
    } catch (error) {
      console.error("Error fetching data", error);
      toast.error("Error fetching data");
    }
  };

  const getAttendantAll = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}api/attendent/getAttendantToday2`
      );

      getAttendants(response.data);
    } catch (error) {}
  };

  const handleReset = () => {
    setFormData({
      // courseId: "",
      courseId: UserType === 2 ? data : "",
      student_id: UserType === 3 ? UserID : UserType === 4 ? UserFOS : "",
      isattend: "",
      sDate: "",
      eDate: "",
    });
    getAttendants([]);
    setShowReport(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    if (UserType === 2) {
      if (name === "courseId") {
        setData(value);
        getClassEnrollmentById(value);
      }
    }
  };
  const getUsersStudent = async () => {
    try {
      const response = await axios.get(`${apiUrl}api/users/getUsersStudent`);

      setUserStudent(response.data);
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
  const getCourseStudent = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}api/classenrollment/getClassenrollmentByStudentId/${UserID}`
      );

      setOurCourse(response.data);
    } catch (error) {
    } finally {
    }
  };
  const getCourseTeacherid = async () => {
    try {
      const response = await axios.get(`${apiUrl}api/course/getCourseStatus`);

      setclassStudent(response.data);
    } catch (error) {
    } finally {
    }
  };
  const getCourseParent = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}api/classenrollment/getClassenrollmentByStudentId/${UserFOS}`
      );

      setOurCourse(response.data);
    } catch (error) {
    } finally {
    }
  };
  const checkPermissionCourse = (UserType) => {
    switch (UserType) {
      case 1:
        return getCourse();
      case 2:
        return getCourse();
      case 3:
        return getCourseStudent();
      case 4:
        return getCourseParent();
      default:
        return;
    }
  };
  const getClassEnrollmentById = async (courseId) => {
    try {
      const response = await axios.get(
        `${apiUrl}api/classenrollment/getClassenrollmentById/${courseId}`
      );
      setClassEnrollment(response.data);
    } catch (error) {
      console.error("Error fetching class enrollment", error);
    }
  };
  useEffect(() => {
    checkPermissionCourse(UserType);

    // getAttendantAll();
    getUsersStudent();
    //getCourse();
    getTeacher();
    getCourseTeacherid();
    if (UserType === 3) {
      formData.student_id = UserID;
    }
    if (UserType === 4) {
      formData.student_id = UserFOS;
    }
    if (UserType === 2) {
      const course = ourCourse.find((item) => item.teacherid === UserID);
      if (course) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          //courseId: course._id,
        }));
        setData(course._id);
        getClassEnrollmentById(course._id);
      }
    }
    const today = new Date().toISOString().split("T")[0];
    if (sdateInputRef.current) {
      sdateInputRef.current.setAttribute("max", today);
    }
    if (edateInputRef.current) {
      edateInputRef.current.setAttribute("max", today);
    }
  }, []);
  return (
    <>
      <Slidebar />
      <Main />
      <div className="ml-72 mr-8">
        <div className="text-left flex items-center justify-center p-12 pb-2">
          <div className="mx-auto w-full">
            <div className="bg-white overflow-hidden shadow rounded-lg border">
              <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                <dl>
                  <div className="py-3 sm:py-5 sm:grid sm:grid-cols-6 sm:gap-6 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Course Name
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <select
                        id="type"
                        name="courseId"
                        value={formData.courseId}
                        onChange={handleChange}
                        className="capitalize bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option value="">Select course...</option>

                        {/* {ourCourse.map((user, i) => (
                          <option
                            value={user._id}
                            key={user._id}
                            className="capitalize"
                          >
                            {user.coursename} || {" Teacher : "}
                            {
                              userTeacher.find(
                                (teacher) => teacher._id === user.teacherid
                              )?.firstName
                            }{" "}
                            {
                              userTeacher.find(
                                (teacher) => teacher._id === user.teacherid
                              )?.lastName
                            }
                          </option>
                        ))} */}
                        {/* admin */}
                        {UserType === 1 &&
                          ourCourse.map((user, i) => (
                            <option
                              value={user._id}
                              key={user._id}
                              className="capitalize"
                            >
                              {user.coursename} || {" Teacher : "}
                              {
                                userTeacher.find(
                                  (teacher) => teacher._id === user.teacherid
                                )?.firstName
                              }{" "}
                              {
                                userTeacher.find(
                                  (teacher) => teacher._id === user.teacherid
                                )?.lastName
                              }
                            </option>
                          ))}
                        {UserType === 2 &&
                          ourCourse
                            .filter((item) => item.teacherid === UserID)
                            .map((user, i) => (
                              <option
                                value={user._id}
                                key={user._id}
                                className="capitalize"
                              >
                                {user.coursename} || {" Teacher : "}
                                {
                                  userTeacher.find(
                                    (teacher) => teacher._id === user.teacherid
                                  )?.firstName
                                }{" "}
                                {
                                  userTeacher.find(
                                    (teacher) => teacher._id === user.teacherid
                                  )?.lastName
                                }
                              </option>
                            ))}

                        {/* student */}
                        {UserType === 3 ||
                          (UserType === 4 &&
                            ourCourse.map((user) => (
                              <option
                                value={user.course_id}
                                key={user._id}
                                className="capitalize"
                              >
                                {user.course_name} || {" Teacher : "}
                                {
                                  userTeacher.find(
                                    (teacher) =>
                                      teacher._id ===
                                      classStudent.find(
                                        (course) =>
                                          course._id === user.course_id
                                      )?.teacherid
                                  )?.firstName
                                }{" "}
                                {
                                  userTeacher.find(
                                    (teacher) =>
                                      teacher._id ===
                                      classStudent.find(
                                        (course) =>
                                          course._id === user.course_id
                                      )?.teacherid
                                  )?.lastName
                                }
                              </option>
                            )))}
                      </select>
                    </dd>
                  </div>
                  <div className="py-3 sm:py-5 sm:grid sm:grid-cols-6 sm:gap-6 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Student Name
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <select
                        id="type"
                        name="student_id"
                        value={formData.student_id}
                        onChange={handleChange}
                        className="capitalize bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        {/* <option value="">Select student...</option> */}
                        {/* {userStudent.map((item) => (
                          <option
                            value={item._id}
                            key={item._id}
                            className="capitalize"
                          >
                            {`${item.firstName}
                            ${item.lastName}`}{" "}
                            || {" Date of Birth : "}
                            {formatDate(item.dob)}
                          </option>
                        ))} */}
                        {(UserType === 1 || UserType === 2) && (
                          <option value="">Select student...</option>
                        )}
                        {UserType === 1 &&
                          userStudent.map((item) => (
                            <option
                              value={item._id}
                              key={item._id}
                              className="capitalize"
                            >
                              {`${item.firstName}
                            ${item.lastName}`}{" "}
                              || {" Date of Birth : "}
                              {formatDate(item.dob)}
                            </option>
                          ))}
                        {UserType === 2 &&
                          classEnrollment.map((i) => (
                            <option value={i.student_id} className="capitalize">
                              {
                                userStudent.find(
                                  (item) => item._id === i.student_id
                                )?.firstName
                              }{" "}
                              {
                                userStudent.find(
                                  (item) => item._id === i.student_id
                                )?.lastName
                              }
                            </option>
                          ))}
                        {UserType === 3 && (
                          <option value={user._id} className="capitalize">
                            {`${user.firstName}
                            ${user.lastName}`}
                          </option>
                        )}
                        {UserType === 4 && (
                          <option value={UserFOS} className="capitalize">
                            {
                              userStudent.find((i) => i._id === UserFOS)
                                ?.firstName
                            }{" "}
                            {
                              userStudent.find((i) => i._id === UserFOS)
                                ?.lastName
                            }
                          </option>
                        )}
                      </select>
                    </dd>
                    <dt className="text-sm font-medium text-gray-500">
                      is_Attend
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <select
                        id="type"
                        name="isattend"
                        value={formData.isattend}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option value="">Select is_attend...</option>
                        <option value="true">Attendant</option>
                        <option value="false">No_attendant</option>
                      </select>
                    </dd>
                  </div>

                  <div className="py-3 sm:py-5 sm:grid sm:grid-cols-6 sm:gap-6 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      From Attendant Date
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <input
                        id="sDate"
                        type="date"
                        name="sDate"
                        ref={sdateInputRef}
                        value={formData.sDate}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                    </dd>
                    <dt className="text-sm font-medium text-gray-500">
                      To Attendant Date
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <input
                        id="eDate"
                        type="date"
                        name="eDate"
                        ref={edateInputRef}
                        value={formData.eDate}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                    </dd>
                  </div>
                </dl>
              </div>
            </div>

            <button
              type="button"
              onClick={handleReset}
              className="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
            >
              Clear
            </button>

            <button
              type="button"
              onClick={handleSubmit}
              className="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Search Result
            </button>
            {showReport && (
              <>
                <button
                  onClick={printReport}
                  className="mt-4 text-white bg-green-500 hover:bg-green-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  Print Report
                </button>
                <button
                  onClick={exportToExcel}
                  className="mt-4 text-white bg-green-500 hover:bg-green-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  Export Excel
                </button>
              </>
            )}
          </div>
        </div>
        {showReport ? (
          <>
            <div className="p-8" id="report">
              <div className="flex justify-center items-center mb-6">
                <img src={logo} className="w-24 h-24" alt="logo SchoolCool" />
              </div>
              <div className="flex justify-center items-center">
                <h1 className="text-2xl font-bold">
                  Attendant Management Report
                </h1>
              </div>
              <div className="flex justify-center items-center mb-6">
                {formData.sDate && formData.eDate && (
                  <p className="text-right">
                    Date: {formatDate(formData.sDate)} to{" "}
                    {formatDate(formData.eDate)}
                  </p>
                )}
              </div>
              <table className="min-w-full table-auto border border-gray-300">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border px-4 py-2 text-center">#</th>
                    <th className="border px-4 py-2 text-left">Course Name</th>
                    <th className="border px-4 py-2 text-left">Student Name</th>
                    <th className="border px-4 py-2 text-center">
                      Attendant Date.
                    </th>

                    <th className="border px-4 py-2 text-center">is_Attend</th>

                    <th className="border px-4 py-2 text-center">
                      Create Date
                    </th>
                    <th className="border px-4 py-2 text-center">
                      Update Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {attendants.map((user, index) => (
                    <tr key={user._id} className="hover:bg-gray-100">
                      <td className="border px-4 py-2">{index + 1}</td>
                      <td className="border px-4 py-2 uppercase text-left">
                        {user.coursename}
                      </td>
                      <td className="border px-4 py-2 text-left uppercase">
                        {
                          userStudent.find(
                            (item) => item._id === user.student_id
                          )?.firstName
                        }
                        {""}{" "}
                        {
                          userStudent.find(
                            (item) => item._id === user.student_id
                          )?.lastName
                        }
                      </td>
                      <td className="border px-4 py-2 text-center">
                        <FormattedDate date={user.attendantdate} />
                      </td>
                      <td className="border px-4 py-2 text-center">
                        {user.isattend ? "Yes" : "No"}
                      </td>
                      <td className="border px-4 py-2 text-center">
                        <FormattedDate date={user.createdDate} />
                      </td>
                      <td className="border px-4 py-2 text-center">
                        <FormattedDate date={user.updateDate} />
                      </td>
                    </tr>
                  ))}
                  {attendants.length === 0 && (
                    <tr>
                      <td
                        className="border px-4 py-8 text-xl text-center font-bold text-red-800"
                        colspan="10"
                      >
                        No result found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              <div className="flex justify-between items-center mt-6">
                <p className="text-sm font-bold">
                  Prepared by: {`${user.firstName} ${user.lastName}`}{" "}
                </p>
                <p className="text-sm font-bold">
                  Date: {formatDate(new Date().toLocaleDateString())}
                </p>
              </div>
              {attendants.length !== 0 && (
                <div className="flex items-center justify-center">
                  <div className="text-center p-6">
                    <h1 className="text-2xl font-bold text-blue-600 mb-4">
                      Thank You!
                    </h1>
                    <p className="text-lg text-gray-700">
                      Your report has been provided successfully.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          ""
        )}
      </div>
      <ToastContainer />
    </>
  );
};

export default Rattendant;
