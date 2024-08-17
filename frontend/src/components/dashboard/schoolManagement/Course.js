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
const Course = () => {
  const sdateInputRef = useRef(null);
  const edateInputRef = useRef(null);
  const [alert, setAlert] = useState(false);
  const [userTeacher, setUserTeacher] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [formData, setFormData] = useState({
    coursename: "",
    description: "",
    sdate: "",
    edate: "",
    teacherid: "",
    room: "",
    status: false,
  });
  //   const fileInputRef = useRef(null);
  const [teams, setTeams] = useState([]);
  const [editteam, setEditteam] = useState(false);
  const [currentTeamId, setCurrentTeamId] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [userById, setUserById] = useState([]);
  const teamsPerPage = 5;
  const getTeam = async () => {
    try {
      const response = await axios.get(`${apiUrl}api/course/getCourse`);

      setTeams(response.data);
    } catch (error) {}
  };
  const getUsersTeacher = async () => {
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
    if (!formData.coursename) {
      toast.error("Cannot empty course name fields *.", {
        position: "bottom-right",
        autoClose: 3000,
      });
    } else {
      setAlert(true);
      try {
        const courseData = {
          coursename: formData.coursename,
          description: formData.description,
          sdate: formData.sdate,
          edate: formData.edate,
          teacherid: formData.teacherid,
          room: formData.room,
          status: formData.status,
          createdDate: new Date(),
          updateDate: new Date(),
        };

        const response = await axios.post(
          `${apiUrl}api/course/register`,
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
      coursename: "",
      description: "",
      sdate: "",
      edate: "",
      teacherid: "",
      room: "",
      status: false,
      createdDate: "",
      updateDate: "",
    });
    setEditteam(false);
    setCurrentTeamId(null);
    setAlert(false);
  };
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const handleSearchSubmit = async (e) => {
    e.preventDefault();

    if (searchQuery) {
      try {
        const response = await axios.get(
          `${apiUrl}api/course/getCourseByName/${searchQuery}`
        );

        setSearchResults(response.data);

        setCurrentPage(1);
      } catch (error) {
        toast.error("team not found.", {
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
      const response = await axios.post(`${apiUrl}api/course/delete/${userId}`);
      setTeams((prevteams) => prevteams.filter((user) => user._id !== userId));
      toast.success("Course deleted successfully.", {
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
      coursename: user.coursename,
      description: user.description,
      sdate: user.sdate,
      edate: user.edate,
      teacherid: user.teacherid,
      room: user.room,
      status: user.status,
    });
  };
  const handleActive = async (userId) => {
    //setLoading(true);
    try {
      const response = await axios.put(`${apiUrl}api/course/update/${userId}`);
      //setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
      //test
      // if (userId === user._id) {
      //   logout();
      // }
      //end

      //getUsers();
      getTeam();

      // const updatedUser = response.data;
      // setUsers((prevUsers) =>
      //   prevUsers.map((user) => (user._id === userId ? updatedUser : user))
      // );
      //new code
      // handleSearchSubmit();
      // if (searchQuery) {
      //   setSearchResults([response.data]);
      // }

      if (searchResults.length > 0) {
        if (searchQuery) {
          try {
            const response = await axios.get(
              `${apiUrl}api/course/getCourseByName/${searchQuery}`
            );

            setSearchResults([response.data]);
            //setLoading(false);
          } catch (error) {
            // setError(error);
            // setLoading(false);
            toast.error("Email not found.", {
              position: "bottom-right",
              autoClose: 2000,
            });
          }
        } else {
          setSearchResults([]); // Reset search results to show all users
          //setLoading(false);
        }
      }

      //end new code
      toast.success("Active Course successfully.", {
        position: "bottom-right",
        autoClose: 2000,
      });
    } catch (error) {
      //setLoading(false);
      toast.error("Cannot active this course. Please try again.", {
        position: "bottom-right",
        autoClose: 2000,
      });
    } finally {
      //setLoading(false);
    }
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!formData.coursename) {
      toast.error("Cannot have empty fields *.", {
        position: "bottom-right",
        autoClose: 3000,
      });
    } else {
      setAlert(true);
      try {
        const updatedUserData = {
          coursename: formData.coursename,
          description: formData.description,
          sdate: formData.sdate,
          edate: formData.edate,
          teacherid: formData.teacherid,
          room: formData.room,
          status: formData.status,
          updateDate: new Date(),
        };

        const response = await axios.put(
          `${apiUrl}api/course/updateCourse/${currentTeamId}`, // userId should be passed here
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
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prevFormData) => ({
  //     ...prevFormData,
  //     [name]: value,
  //   }));
  // };
  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
      // [name]: checked,
    }));
    setIsChecked(e.target.checked);
  };
  useEffect(() => {
    getTeam();
    getUsersTeacher();
    // getUserById(item);
    const today = new Date().toISOString().split("T")[0];
    if (sdateInputRef.current) {
      sdateInputRef.current.setAttribute("min", today);
    }
    if (edateInputRef.current) {
      edateInputRef.current.setAttribute("min", today);
    }
  }, [apiUrl]);
  return (
    <>
      <Slidebar />
      <Main />
      <div className="ml-72 mr-8">
        <div className="text-left flex items-center justify-center p-12">
          <div className="mx-auto w-full">
            <div className="bg-white overflow-hidden shadow rounded-lg border">
              <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                {/* <dl className="sm:divide-y sm:divide-gray-200"> */}
                <dl>
                  <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Course Name <span className="text-red-500">*</span>
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <input
                        type="text"
                        id="coursename"
                        name="coursename"
                        value={formData.coursename}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder=""
                        required
                      />
                    </dd>
                  </div>
                  <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Description
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <textarea
                        type="text"
                        id="description"
                        name="description"
                        rows={2}
                        value={formData.description}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder=""
                      />
                    </dd>
                  </div>
                  <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Start Date{" "}
                      <sup className="text-xs text-blue-500">
                        {" "}
                        (Month/Day/Year)
                      </sup>
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <input
                        type="date"
                        id="sdate"
                        name="sdate"
                        ref={sdateInputRef}
                        value={
                          formData.sdate ? formData.sdate.split("T")[0] : ""
                        }
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                    </dd>
                  </div>
                  <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      End Date{" "}
                      <sup className="text-xs text-blue-500">
                        {" "}
                        (Month/Day/Year)
                      </sup>
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <input
                        type="date"
                        id="edate"
                        name="edate"
                        ref={edateInputRef}
                        value={
                          formData.edate ? formData.edate.split("T")[0] : ""
                        }
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Web Developer"
                      />
                    </dd>
                  </div>
                  <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Teacher response
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <select
                        id="type"
                        name="teacherid"
                        value={formData.teacherid}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option value="">Select teacher...</option>

                        {userTeacher.map((user, i) => (
                          <option
                            value={user._id}
                            key={user._id}
                            className="uppercase"
                          >
                            {`${user.firstName} ${user.lastName}`}
                          </option>
                        ))}
                      </select>
                    </dd>
                  </div>
                  <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Room | Class
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <input
                        type="text"
                        id="room"
                        name="room"
                        value={formData.room}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder=""
                      />
                    </dd>
                  </div>
                  <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Active Course?
                    </label>

                    <label className="inline-flex items-center cursor-pointer ">
                      <input
                        type="checkbox"
                        value={formData.status}
                        onChange={handleChange}
                        className="sr-only peer"
                        name="status"
                        checked={formData.status}
                      />
                      <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                        {isChecked ? "On" : "Off"}
                      </span>
                    </label>
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
                <th scope="col" className="px-6 py-3">
                  Description
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Start Date
                </th>

                <th scope="col" className="px-6 py-3 text-center">
                  End Date
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Teacher Respone
                </th>

                <th scope="col" className="px-6 py-3 text-center">
                  Room | Class
                </th>
                <th scope="col" className="px-6 py-3 text-center w-60">
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
                  <td className="px-6 py-4 text-blue-500 font-bold">
                    {user.coursename}
                  </td>
                  <td className="px-6 py-4">{user.description}</td>
                  <td className="px-6 py-4 text-center">
                    <FormattedDate date={user.sdate} />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <FormattedDate date={user.edate} />
                  </td>

                  {/* <td className="px-6 py-4">{user.teacherid}</td> */}
                  <td className="px-6 py-4 text-center">
                    <td className="px-6 py-4 uppercase">
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
                    </td>
                  </td>

                  <td className="px-6 py-4 text-center">{user.room}</td>

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
                      key={user._id}
                      onDelete={() => handleActive(user._id)}
                      className={`py-2.5 px-5 me-2 mb-2 text-sm font-medium focus:outline-none ${
                        user.status
                          ? "bg-green-500 text-white"
                          : "bg-white text-gray-900"
                      } rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700`}
                      ico={user.status ? "ri-eye-line" : "ri-eye-off-line"}
                      text={
                        user.status
                          ? "Do you want to deactivate this course?"
                          : "Do you want to activate this course?"
                      }
                    />
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
                  Total Courses :
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

export default Course;
