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
const ClassEnrollment = () => {
  const sdateInputRef = useRef(null);
  const edateInputRef = useRef(null);
  const [alert, setAlert] = useState(false);
  const [userStudent, setUserStudent] = useState([]);
  const [userTeacher, setUserTeacher] = useState([]);
  const [ourCourse, setOurCourse] = useState([]);
  const [selectedText, setSelectedText] = useState("");
  const [formData, setFormData] = useState({
    course_id: "",
    course_name: "",
    student_id: "",
  });
  //   const fileInputRef = useRef(null);
  const [teams, setTeams] = useState([]);
  const [editteam, setEditteam] = useState(false);
  const [currentTeamId, setCurrentTeamId] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [userById, setUserById] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const teamsPerPage = 5;
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB");
  };
  const getTeam = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}api/classenrollment/getClassenrollment`
      );

      setTeams(response.data);
    } catch (error) {}
  };

  const getUsersStudent = async () => {
    try {
      const response = await axios.get(`${apiUrl}api/users/getUsersStudent`);

      setUserStudent(response.data);
    } catch (error) {
    } finally {
    }
  };
  //   const getUsersTeacher = async () => {
  //     try {
  //       const response = await axios.get(`${apiUrl}api/users/getUsersTeacher`);

  //       setUserTeacher(response.data);
  //     } catch (error) {
  //     } finally {
  //     }
  //   };
  const getCourse = async () => {
    try {
      const response = await axios.get(`${apiUrl}api/course/getCourseStatus`);

      setOurCourse(response.data);
    } catch (error) {
    } finally {
    }
  };
  const getTeacher = async () => {
    try {
      const response = await axios.get(`${apiUrl}api/users/getUsersTeacher`);

      setUserTeacher(response.data);
    } catch (error) {
    } finally {
    }
  };
  const getUserById = async (userId) => {
    try {
      const response = await axios.get(
        `${apiUrl}api/users/getUsersById/${userId}`
      );
      setUserById(response.data);

      setFormData({
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        gender: response.data.gender,
        dob: response.data.dob,
        fos: response.data.fos,
        phoneNumber: response.data.phoneNumber,
        type: response.data.type,
        email: response.data.email,
        status: response.data.status,
        createdDate: response.data.createdDate,
        updateDate: response.data.updateDate,
      });
    } catch (error) {
      // setError(error);
      // setLoading(false);
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.course_id || !formData.student_id) {
      toast.error("Cannot empty fields *.", {
        position: "bottom-right",
        autoClose: 3000,
      });
    } else {
      setAlert(true);
      try {
        //check register exist
        // Check if the course_id and student_id combination already exists
        const checkResponse = await axios.get(
          `${apiUrl}api/classenrollment/check`,
          {
            params: {
              course_id: formData.course_id,
              student_id: formData.student_id,
            },
          }
        );

        if (checkResponse.data.exists) {
          toast.error("This student is already enrolled in the course.", {
            position: "bottom-right",
            autoClose: 3000,
          });
          setAlert(false);
          return;
        }
        //end check
        const courseData = {
          course_id: formData.course_id,
          course_name: selectedText,
          student_id: formData.student_id,
          isdelete: false,
          createdDate: new Date(),
          updateDate: new Date(),
        };

        const response = await axios.post(
          `${apiUrl}api/classenrollment/register`,
          courseData
        );

        toast.success("Updated successfully.", {
          position: "bottom-right",
          autoClose: 1000,
        });

        handleReset();
        getTeam();
      } catch (error) {
        toast.error("Cannot update. Please try again.", {
          position: "bottom-right",
          autoClose: 2000,
        });
      } finally {
        //setLoading(false);
        setAlert(false);
      }
    }
  };
  const handleReset = () => {
    setFormData({
      course_id: "",
      student_id: "",
      course_name: "",
      createdDate: "",
      updateDate: "",
    });
    setEditteam(false);
    setCurrentTeamId(null);
    setAlert(false);
    setSelectedText("");
  };
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const handleSearchSubmit = async (e) => {
    e.preventDefault();

    if (searchQuery) {
      try {
        const response = await axios.get(
          `${apiUrl}api/classenrollment/getClassenrollmentByName/${searchQuery}`
        );

        setSearchResults(response.data);

        setCurrentPage(1);
      } catch (error) {
        toast.error("this class enrollment not found.", {
          position: "bottom-right",
          autoClose: 2000,
        });
      }
    } else {
      setSearchResults([]);
    }
  };

  const handleDelete = async (userId, e) => {
    try {
      const response = await axios.post(
        `${apiUrl}api/classenrollment/delete/${userId}`
      );
      setTeams((prevteams) => prevteams.filter((user) => user._id !== userId));
      toast.success("Class Enrollment deleted successfully.", {
        position: "bottom-right",
        autoClose: 2000,
      });
      setSearchResults([]);
    } catch (error) {
      toast.error("Cannot delete. Please try another.", {
        position: "bottom-right",
        autoClose: 2000,
      });
    } finally {
    }
  };

  const handleEdit = (user) => {
    setEditteam(true);
    setCurrentTeamId(user._id);
    setFormData({
      course_id: user.course_id,
      //course_name: user.course_name,
      student_id: user.student_id,
    });
    setSelectedText(user.course_name);
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!formData.student_id || !formData.course_id) {
      toast.error("Cannot have empty fields *.", {
        position: "bottom-right",
        autoClose: 3000,
      });
    } else {
      setAlert(true);
      try {
        const updatedUserData = {
          course_id: formData.course_id,
          course_name: selectedText,
          student_id: formData.student_id,
          updateDate: new Date(),
        };

        const response = await axios.put(
          `${apiUrl}api/classenrollment/updateClassenrollment/${currentTeamId}`, // userId should be passed here
          updatedUserData
        );
        toast.success("Updated successfully.", {
          position: "bottom-right",
          autoClose: 1000,
        });

        handleReset();
        getTeam();
      } catch (error) {
        toast.error("Cannot update. Please try again.", {
          position: "bottom-right",
          autoClose: 2000,
        });
      } finally {
        setAlert(false);
      }
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleChange2 = (e) => {
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
  };
  const filterStudents = (selectedCourseId) => {
    // Get the list of student IDs enrolled in the selected course
    const enrolledStudentIds = teams
      .filter((enrollment) => enrollment.course_id === selectedCourseId)
      .map((enrollment) => enrollment.student_id);

    // Filter out the students based on the selected course
    const filtered = userStudent.filter(
      (student) => !enrolledStudentIds.includes(student._id)
    );

    // Update the state with the filtered list
    setFilteredStudents(filtered);
  };
  useEffect(() => {
    getTeam();
    getUsersStudent();
    getTeacher();
    getCourse();
    // console.log(selectedText);
    //console.log(userTeacher);
    const today = new Date().toISOString().split("T")[0];
    if (sdateInputRef.current) {
      sdateInputRef.current.setAttribute("min", today);
    }
    if (edateInputRef.current) {
      edateInputRef.current.setAttribute("min", today);
    }
  }, [apiUrl, selectedText]);
  useEffect(() => {
    if (teams.length && userStudent.length) {
      filterStudents(formData.course_id);
    }
  }, [teams, userStudent]);

  return (
    <>
      <Slidebar />
      <Main />
      <div className="ml-72 mr-8">
        <div className="text-left flex items-center justify-center p-12">
          <div className="mx-auto w-full">
            <div className="bg-white overflow-hidden shadow rounded-lg border">
              <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                <dl className="sm:divide-y sm:divide-gray-200">
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
                      Student Name <span className="text-red-500">*</span>
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <select
                        id="type"
                        name="student_id"
                        value={formData.student_id}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option value="">Select student name...</option>

                        {/* {userStudent.map((user, i) => (
                          <option
                            value={user._id}
                            key={user._id}
                            className="uppercase"
                          >
                            {`${user.firstName} ${user.lastName}`}
                          </option>
                        ))} */}
                        {filteredStudents.map((user) => (
                          <option
                            value={user._id}
                            key={user._id}
                            className="capitalize"
                          >
                            {`${user.firstName} ${user.lastName}`} ||{" "}
                            {"Date of Birth : "}
                            {formatDate(user.dob)}
                          </option>
                        ))}
                      </select>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
            {alert ? (
              <p className="text-red-500 pt-4">* Please wait....</p>
            ) : (
              ""
            )}

            <button
              type="button"
              onClick={handleReset}
              className="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
            >
              Clear
            </button>
            {editteam ? (
              <button
                type="button"
                onClick={handleUpdate}
                className="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Update
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Add
              </button>
            )}
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
                placeholder="Search for course name..."
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
                  Course Name
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Student Name
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Teacher Respone
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Register Date
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Update Date
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {currentteams.map((user, i) => (
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

                  <td className="px-6 py-4 capitalize text-blue-500 font-bold">
                    {user.course_name}
                  </td>

                  <td className="px-6 py-4 uppercase text-center">
                    {
                      userStudent.find(
                        (student) => student._id === user.student_id
                      )?.firstName
                    }{" "}
                    {
                      userStudent.find(
                        (student) => student._id === user.student_id
                      )?.lastName
                    }
                  </td>
                  <td className="px-6 py-4 uppercase text-center">
                    {
                      userTeacher.find(
                        (teacher) =>
                          teacher._id ===
                          ourCourse.find(
                            (student) => student._id === user.course_id
                          )?.teacherid
                      )?.firstName
                    }{" "}
                    {
                      userTeacher.find(
                        (teacher) =>
                          teacher._id ===
                          ourCourse.find(
                            (student) => student._id === user.course_id
                          )?.teacherid
                      )?.lastName
                    }
                  </td>
                  <td className="px-6 py-4 text-center">
                    <FormattedDate date={user.createdDate} />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <FormattedDate date={user.updateDate} />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      type="button"
                      key={user._id}
                      onClick={() => handleEdit(user)}
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                      <i className="ri-file-edit-line"></i>
                    </button>
                    <DeleteConfirm
                      onDelete={() => handleDelete(user._id)}
                      className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                      ico="ri-delete-bin-line"
                      text="Are you sure you want to delete?"
                    />
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

export default ClassEnrollment;
