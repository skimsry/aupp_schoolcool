import React, { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormattedDate from "../FormattedDate";
import Slidebar from "../partial/Slidebar";
import Main from "../partial/Main";
import logo from "../../../assets/schoolcool.png";
import { UserContext } from "../../../ctx/UserContextProvider";
import { utils, writeFile } from "xlsx";
const apiUrl = process.env.REACT_APP_APIURL;
const Rcourse = () => {
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
    coursename: "",
    teacherid: "",
    status: "",
    sDate: getFormattedDate(new Date()),
    eDate: getFormattedDate(new Date()),
  });
  const [showReport, setShowReport] = useState(true);
  const [courses, setCourses] = useState([]);
  const [userTeacher, setUserTeacher] = useState([]);
  const [ourCourse, setOurCourse] = useState([]);
  const { user } = useContext(UserContext);
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
    utils.book_append_sheet(wb, ws, "Course Management Report");
    writeFile(wb, "Course_Management_Report.xlsx");
  };
  const handleSubmit = async () => {
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
        `${apiUrl}api/course/getCourseByCriteria`,
        {
          params: {
            coursename: formData.coursename,
            teacherid: formData.teacherid,
            status: formData.status,
            startDate,
            endDate,
          },
        }
      );

      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching data", error);
      toast.error("Error fetching data");
    }
  };

  const getCourseAll = async () => {
    try {
      const response = await axios.get(`${apiUrl}api/course/getCourseToday`);

      setCourses(response.data);
    } catch (error) {}
  };

  const handleReset = () => {
    setFormData({
      coursename: "",
      teacherid: "",
      status: "",
      sDate: "",
      eDate: "",
    });
    setCourses([]);
    setShowReport(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const getUsersTeacher = async () => {
    try {
      const response = await axios.get(`${apiUrl}api/users/getUsersTeacher`);

      setUserTeacher(response.data);
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
  useEffect(() => {
    getCourseAll();
    getUsersTeacher();
    getCourse();

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
                        name="coursename"
                        value={formData.coursename}
                        onChange={handleChange}
                        className="capitalize bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option value="">Select course...</option>
                        {Array.from(
                          new Set(ourCourse.map((item) => item.coursename))
                        ).map((coursename, index) => (
                          <option
                            value={coursename}
                            key={index}
                            className="capitalize"
                          >
                            {coursename}
                          </option>
                        ))}
                      </select>
                    </dd>
                  </div>
                  <div className="py-3 sm:py-5 sm:grid sm:grid-cols-6 sm:gap-6 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Teacher Response
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <select
                        id="type"
                        name="teacherid"
                        value={formData.teacherid}
                        onChange={handleChange}
                        className="capitalize bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option value="">Select teacher...</option>
                        {userTeacher.map((item) => (
                          <option
                            value={item._id}
                            key={item._id}
                            className="capitalize"
                          >
                            {`${item.firstName}
                            ${item.lastName}`}
                          </option>
                        ))}
                      </select>
                    </dd>
                    <dt className="text-sm font-medium text-gray-500">
                      Status
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <select
                        id="type"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option value="">Select status...</option>
                        <option value="true">True</option>
                        <option value="false">False</option>
                      </select>
                    </dd>
                  </div>
                  <div className="py-3 sm:py-5 sm:grid sm:grid-cols-6 sm:gap-6 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      From Date
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
                      To Date
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
                <h1 className="text-2xl font-bold">Course Management Report</h1>
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
                    <th className="border px-4 py-2 text-left">Description</th>
                    <th className="border px-4 py-2 text-center">
                      Start Course
                    </th>
                    <th className="border px-4 py-2 text-center">End Course</th>
                    <th className="border px-4 py-2 text-center">
                      Teacher Response
                    </th>
                    <th className="border px-4 py-2 text-center">
                      Room | Class
                    </th>

                    <th className="border px-4 py-2 text-center">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((user, index) => (
                    <tr key={user._id} className="hover:bg-gray-100">
                      <td className="border px-4 py-2">{index + 1}</td>
                      <td className="border px-4 py-2 uppercase text-left">
                        {user.coursename}
                      </td>
                      <td className="border px-4 py-2 text-left">
                        {user.description}
                      </td>
                      <td className="border px-4 py-2 text-center">
                        <FormattedDate date={user.sdate} />
                      </td>
                      <td className="border px-4 py-2 text-center">
                        <FormattedDate date={user.edate} />
                      </td>
                      <td className="border px-4 py-2 text-center uppercase">
                        {
                          userTeacher.find(
                            (item) => item._id === user.teacherid
                          )?.firstName
                        }
                        {""}{" "}
                        {
                          userTeacher.find(
                            (item) => item._id === user.teacherid
                          )?.lastName
                        }
                      </td>
                      <td className="border px-4 py-2 text-center">
                        {user.room}
                      </td>

                      <td className="border px-4 py-2 text-center">
                        {user.status === false
                          ? "Disactive"
                          : user.status === true
                          ? "Active"
                          : ""}
                      </td>
                    </tr>
                  ))}
                  {courses.length === 0 && (
                    <tr>
                      <td
                        className="border px-4 py-8 text-xl text-center font-bold text-red-800"
                        colspan="9"
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
              {courses.length !== 0 && (
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

export default Rcourse;
