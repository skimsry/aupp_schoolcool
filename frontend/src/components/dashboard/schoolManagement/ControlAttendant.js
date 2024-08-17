import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormattedDate from "../FormattedDate";
import Slidebar from "../partial/Slidebar";
import Main from "../partial/Main";
import DeleteConfirm from "../userManagement/DeleteConfirm";

const apiUrl = process.env.REACT_APP_APIURL;
const ControlAttendant = () => {
  const sdateInputRef = useRef(null);
  const edateInputRef = useRef(null);
  const [alert, setAlert] = useState(false);
  const [userStudent, setUserStudent] = useState([]);
  const [userTeacher, setUserTeacher] = useState([]);
  const [ourCourse, setOurCourse] = useState([]);
  const [selectedText, setSelectedText] = useState("");
  const [selectedText2, setSelectedText2] = useState("");
  const [formData, setFormData] = useState({
    course_id: "",
    coursename: "",
    student_id: "",
    studentname: "",
    sDate: "",
    eDate: "",
  });

  const [teams, setTeams] = useState([]);
  const [teams2, setTeams2] = useState([]);
  const [editteam, setEditteam] = useState(false);
  const [currentTeamId, setCurrentTeamId] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState(true);
  const teamsPerPage = 5;
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB");
  };
  const getTeacher = async () => {
    try {
      const response = await axios.get(`${apiUrl}api/users/getUsersTeacher`);

      setUserTeacher(response.data);
    } catch (error) {
    } finally {
    }
  };
  const handleSubmit = async () => {
    // Validate date range
    if (
      formData.sDate &&
      formData.eDate &&
      new Date(formData.sDate) > new Date(formData.eDate)
    ) {
      toast.error(
        "Start date cannot be greater than end date. Please check again.",
        {
          position: "bottom-right",
          autoClose: 2000,
        }
      );
      return;
    }
    try {
      let startDate = "";
      let endDate = "";
      if (formData.sDate) {
        const startDates = new Date(formData.sDate);
        startDate = startDates.toLocaleDateString();
      }
      if (formData.sDate) {
        const endDates = new Date(formData.eDate);
        endDates.setDate(endDates.getDate() + 1);
        endDate = endDates.toLocaleDateString();
      }

      const response = await axios.get(
        `${apiUrl}api/attendent/getAttendantByCriteria`,
        {
          params: {
            // studentname: selectedText2,
            // coursename: selectedText,
            course_id: formData.course_id,
            student_id: formData.student_id,
            startDate,
            endDate,
          },
        }
      );
      if (response.data.length === 0) {
        setResults(false);
        toast.error("No Result Found.", {
          position: "bottom-left",
          autoClose: 2000,
        });
      } else {
        setResults(true);
        setSearchResults(response.data);
      }
      // setSearchResults(response.data);
      //console.log(selectedText2);
    } catch (error) {
      console.error("Error fetching data", error);
      toast.error("Error fetching data");
    }
  };
  const getTeam = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}api/attendent/getAttendantAll`
      );

      setTeams(response.data);
    } catch (error) {}
  };
  const handleChange2 = async (e) => {
    setTeams2([]);
    const { name, value, type } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    // if (type === "select-one") {
    //   const selectedOptionText = e.target.options[e.target.selectedIndex].text;
    //   setSelectedText(selectedOptionText);
    // }
    if (type === "select-one") {
      const selectedOptionText = e.target.options[e.target.selectedIndex].text;
      const marketingText = selectedOptionText.split(" || ")[0].trim();
      setSelectedText(marketingText);
    }

    try {
      const response = await axios.get(
        `${apiUrl}api/classenrollment/getClassenrollmentById/${value}`
      );

      setTeams2(response.data);
    } catch (error) {}
  };
  const handleChange3 = async (e) => {
    const { name, value, type } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    // if (type === "select-one") {
    //   const selectedOptionText = e.target.options[e.target.selectedIndex].text;
    //   setSelectedText2(selectedOptionText);
    // }
    if (type === "select-one") {
      const selectedOptionText = e.target.options[e.target.selectedIndex].text;
      const marketingText = selectedOptionText.split(" || ")[0].trim();
      setSelectedText2(marketingText);
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

  // const getCourse = async () => {
  //   try {
  //     const response = await axios.get(`${apiUrl}api/course/getCourse`);

  //     setOurCourse(response.data);
  //   } catch (error) {
  //   } finally {
  //   }
  // };
  const getCourse = async () => {
    try {
      const response = await axios.get(`${apiUrl}api/course/getCourseStatus`);

      setOurCourse(response.data);
    } catch (error) {
    } finally {
    }
  };

  // Pagination logic
  const indexOfLastUser = currentPage * teamsPerPage;
  const indexOfFirstUser = indexOfLastUser - teamsPerPage;
  const currentteams = (searchResults.length > 0 ? searchResults : teams).slice(
    indexOfFirstUser,
    indexOfLastUser
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleNext = () => {
    if (
      currentPage <
      Math.ceil(
        (searchResults.length > 0 ? searchResults : teams).length / teamsPerPage
      )
    ) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleReset = () => {
    setFormData({
      course_id: "",
      student_id: "",
      coursename: "",
      studentname: "",
      sDate: "",
      eDate: "",
      createdDate: "",
      updateDate: "",
    });
    setEditteam(false);
    setCurrentTeamId(null);
    setAlert(false);
    setSelectedText("");
    setSelectedText2("");
    setSearchResults([]);
  };
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const handleSearchSubmit = async (e) => {
    e.preventDefault();

    if (searchQuery) {
      try {
        const response = await axios.get(
          `${apiUrl}api/attendent/getAttendantByName/${searchQuery}`
        );

        setSearchResults(response.data);

        setCurrentPage(1);
      } catch (error) {
        toast.error("This Student not found.", {
          position: "bottom-right",
          autoClose: 2000,
        });
      }
    } else {
      setSearchResults([]);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  useEffect(() => {
    getTeam();
    getUsersStudent();
    getTeacher();
    getCourse();
    setResults(true);
    const today = new Date().toISOString().split("T")[0];
    if (sdateInputRef.current) {
      sdateInputRef.current.setAttribute("min", today);
    }
    if (edateInputRef.current) {
      edateInputRef.current.setAttribute("min", today);
    }
  }, [apiUrl, selectedText, teams2]);
  return (
    <>
      <Slidebar />
      <Main />
      <div className="ml-72 mr-8">
        <div className="text-left flex items-center justify-center p-12">
          <div className="mx-auto w-full">
            <div className="bg-white overflow-hidden shadow rounded-lg border">
              <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                <dl className="">
                  <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Course Name <span className="text-red-500">*</span>
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <select
                        id="type"
                        name="course_id"
                        value={formData.course_id}
                        onChange={handleChange2}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option value="">Select course name...</option>

                        {/* {ourCourse.map((user, i) => (
                          <option value={user._id} key={user._id} className="">
                            {user.coursename}
                          </option>
                        ))} */}
                        {ourCourse.map((user, i) => (
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
                      </select>
                    </dd>
                  </div>

                  <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Student Name
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <select
                        id="type"
                        name="student_id"
                        value={formData.student_id}
                        onChange={handleChange3}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option value="">Select student name...</option>

                        {teams2.map((user, i) => (
                          <option value={user.student_id} key={user._id}>
                            {
                              userStudent.find(
                                (student) => student._id === user.student_id
                              )?.firstName
                            }{" "}
                            {
                              userStudent.find(
                                (student) => student._id === user.student_id
                              )?.lastName
                            }{" "}
                            ||{" Date of Birth : "}
                            {formatDate(
                              userStudent.find(
                                (student) => student._id === user.student_id
                              )?.dob
                            )}
                          </option>
                        ))}
                      </select>
                    </dd>
                  </div>
                  <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Start Date{" "}
                      <sup className="text-blue-500">(Month / Day / Year)</sup>
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <input
                        id="sDate"
                        type="date"
                        name="sDate"
                        value={formData.sDate}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                    </dd>
                  </div>
                  <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      End Date{" "}
                      <sup className="text-blue-500">(Month / Day / Year)</sup>
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <input
                        id="eDate"
                        type="date"
                        name="eDate"
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
          </div>
        </div>
        <div className="shadow-md sm:rounded-lg">
          <form
            className="max-w-md mx-auto mb-4 pl-4"
            onSubmit={handleSearchSubmit}
          >
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search for student name..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <button
                type="submit"
                className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Search
              </button>
            </div>
          </form>

          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="p-4">
                  <div className="flex items-center">
                    <label htmlFor="number" className="font-bold">
                      #
                    </label>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">
                  Student Name
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Course Name
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Attendant Date
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  is_attend
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Assign Date
                </th>

                <th scope="col" className="px-6 py-3 text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {results &&
                currentteams.map((user, i) => (
                  <tr
                    key={user._id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="w-4 p-4">
                      <div className="flex items-center">
                        <label htmlFor="1" className="font-bold">
                          {indexOfFirstUser + i + 1}.
                        </label>
                      </div>
                    </td>
                    <td className="px-6 py-4 uppercase text-blue-500 font-black">
                      {user.studentname}
                    </td>
                    <td className="px-6 py-4 capitalize text-center">
                      {user.coursename}
                    </td>

                    <td className="px-6 py-4 text-center font-black text-center text-blue-500">
                      <FormattedDate date={user.attendantdate} />
                    </td>
                    <td className="px-6 py-4 text-center font-black text-center">
                      {user.isattend ? (
                        <i class="ri-shield-check-fill text-3xl text-green-500"></i>
                      ) : (
                        <i class="ri-shield-cross-fill text-3xl text-red-500"></i>
                      )}
                    </td>

                    <td className={`px-6 py-4 text-center font-extrabold`}>
                      <FormattedDate date={user.createdDate} />
                    </td>

                    <td className="px-6 py-4 text-center">
                      <button
                        type="button"
                        onClick={async () => {
                          try {
                            const updatedUserData = {
                              updateDate: new Date(),
                            };

                            await axios.put(
                              `${apiUrl}api/attendent/updateAttendentStatus/${user._id}`,
                              updatedUserData
                            );
                            toast.success("Updated successfully.", {
                              position: "bottom-right",
                              autoClose: 1000,
                            });

                            getTeam();
                          } catch (error) {
                            toast.error("Cannot update. Please try again.", {
                              position: "bottom-right",
                              autoClose: 2000,
                            });
                          }
                        }}
                        className={`text-white ${
                          user.isattend
                            ? "bg-blue-800 hover:bg-red-500"
                            : "bg-red-500 hover:bg-blue-800"
                        } focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800`}
                      >
                        {user.isattend ? (
                          <i className="ri-user-follow-line"></i>
                        ) : (
                          <i className="ri-user-unfollow-line"></i>
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          <div className="flex justify-center mt-4">
            <nav aria-label="Page navigation example">
              <ul className="inline-flex -space-x-px text-base h-10">
                <li>
                  <a
                    href="#"
                    onClick={handlePrevious}
                    className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    Previous
                  </a>
                </li>

                {Array.from({
                  length: Math.ceil(
                    (searchResults.length > 0 ? searchResults : teams).length /
                      teamsPerPage
                  ),
                }).map((_, i) => (
                  <li key={i}>
                    <a
                      href="#"
                      onClick={() => paginate(i + 1)}
                      className={`flex items-center justify-center px-4 h-10 leading-tight text-gray-500 border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                        currentPage === i + 1
                          ? "bg-blue-500 text-white"
                          : "bg-white text-blue-500"
                      }`}
                    >
                      {i + 1}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href="#"
                    onClick={handleNext}
                    className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    Next
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          {searchResults.length > 0 ? (
            <div className="h-10"></div>
          ) : (
            <div className="flex justify-end">
              <ul className="inline-flex -space-x-px text-base h-10 mb-4 pr-8">
                <li className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg dark:border-gray-700 dark:text-gray-400">
                  Total Class Enrollment :
                </li>
                <li className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 border border-gray-300 rounded-e-lg dark:text-gray-400 bg-blue-700 text-white">
                  {teams.length}
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default ControlAttendant;
