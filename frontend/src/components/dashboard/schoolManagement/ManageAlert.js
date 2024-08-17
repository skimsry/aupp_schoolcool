import React, { useState, useEffect, useRef } from "react";
import Slidebar from "../partial/Slidebar";
import Main from "../partial/Main";
import axios from "axios";
//import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormattedDate from "../FormattedDate";
import DeleteConfirm from "../userManagement/DeleteConfirm";
const apiUrl = process.env.REACT_APP_APIURL;
const ManageAlert = () => {
  const [files, setFiles] = useState([]);
  // const [profileimg, setProfileimag] = useState(null);
  // const [name, setName] = useState("");
  const [alert, setAlert] = useState(false);
  const [userTeacher, setUserTeacher] = useState([]);
  // const [position, setPosition] = useState("");
  const fileInputRef = useRef(null);
  const [teams, setTeams] = useState([]);
  const [editteam, setEditteam] = useState(false);
  const [currentTeamId, setCurrentTeamId] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const teamsPerPage = 5;
  const [formData, setFormData] = useState({
    codeTitle: "",
    title: "",
    content: "",
    audience: "",
    toId: "",
    courseId: "",
    status: false,
  });
  const [vtype, setVtype] = useState([]);
  const [vAllUser, setVAllUser] = useState([]);
  const [vcourse, setVcourse] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
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
  const getUsersAll = async () => {
    try {
      const response = await axios.get(`${apiUrl}api/users/getUsers`);

      setVAllUser(response.data);
    } catch (error) {
    } finally {
    }
  };
  const getAlert = async () => {
    try {
      const response = await axios.get(`${apiUrl}api/alert/getAlert`);

      setTeams(response.data);
    } catch (error) {}
  };
  const getCourse = async () => {
    try {
      const response = await axios.get(`${apiUrl}api/course/getCourseStatus`);

      setVcourse(response.data);
    } catch (error) {}
  };

  const getUserByTypeId = async (type) => {
    try {
      const response = await axios.get(
        `${apiUrl}api/users/getUsersByType?type=${type}`
      );

      setVtype(response.data);
    } catch (error) {}
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
    const maxFiles = 10;
    if (files.length > maxFiles) {
      toast.error(`You can only upload a maximum of ${maxFiles} files.`, {
        position: "bottom-right",
        autoClose: 2000,
      });
      setFiles("");
      return;
    }
    if (!formData.title || !formData.content) {
      toast.error("Fields cannot be empty *.", {
        position: "bottom-right",
        autoClose: 3000,
      });
      return;
    }

    const formData2 = new FormData();
    formData2.append("title", formData.title);
    formData2.append("content", formData.content);
    formData2.append("postaudience", formData.audience) ||
      formData2.append("toId", formData.toId) ||
      formData2.append("courseId", formData.courseId);
    //formData2.append("toId", formData.toId);
    // formData2.append("courseId", formData.courseId);
    formData2.append("status", formData.status);

    for (let i = 0; i < files.length; i++) {
      formData2.append("photos", files[i]);
    }

    setAlert(true);

    try {
      const response = await axios.post(
        `${apiUrl}api/admin_alert_upload`,
        formData2,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Alert posted successfully.", {
        position: "bottom-right",
        autoClose: 1000,
      });

      handleReset();
      getAlert();
    } catch (error) {
      toast.error("Cannot post alert. Please try again.", {
        position: "bottom-right",
        autoClose: 2000,
      });
    } finally {
      setAlert(false);
    }
  };

  const handleReset = () => {
    setEditteam(false);
    setFormData({
      codeTitle: "",
      title: "",
      content: "",
      audience: "",
      toId: "",
      courseId: "",
      status: false,
    });
    setFiles("");
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const handleSearchSubmit = async (e) => {
    e.preventDefault();

    if (searchQuery) {
      try {
        const response = await axios.get(
          `${apiUrl}api/alert/getAlertByTitle/${searchQuery}`
        );
        // setSearchResults([response.data]);
        setSearchResults(response.data);
        setCurrentPage(1);
      } catch (error) {
        toast.error("This alert not found.", {
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
      const response = await axios.post(`${apiUrl}api/alert/delete/${userId}`);
      setTeams((prevteams) =>
        prevteams.filter((user) => user.codeTitle !== userId)
      );
      toast.success("This Alert deleted successfully.", {
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
    setCurrentTeamId(user.codeTitle);
    //getUserByTypeId(user.postaudience);
    //getUserByTypeId("7");

    setFormData({
      codeTitle: user.codeTitle,
      title: user.title,
      content: user.content,
      audience: user.postaudience,
      toId: user.toId,
      courseId: user.courseId,
      status: user.status,
    });
    //console.log(user.postaudience);
    setIsChecked(user.status);
    // setFiles("");
    // if (fileInputRef.current) {
    //   fileInputRef.current.value = null;
    // }
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    const maxFiles = 1;
    if (files.length > maxFiles) {
      toast.error(
        `Update can only upload a one file. Create new Alert if you want upload more one file.`,
        {
          position: "bottom-right",
          autoClose: 2000,
        }
      );
      setFiles("");
      return;
    }
    if (!formData.title || !formData.content) {
      toast.error("Fields cannot be empty *.", {
        position: "bottom-right",
        autoClose: 3000,
      });
      return;
    }
    const formData2 = new FormData();
    formData2.append("codeTitle", formData.codeTitle);
    formData2.append("title", formData.title);
    formData2.append("content", formData.content);
    formData2.append("postaudience", formData.audience) ||
      formData2.append("toId", formData.toId) ||
      formData2.append("courseId", formData.courseId);
    // formData2.append("postaudience", formData.audience);
    // formData2.append("toId", formData.toId);
    // formData2.append("courseId", formData.courseId);
    formData2.append("status", formData.status);

    for (let i = 0; i < files.length; i++) {
      formData2.append("photos", files[i]);
    }

    setAlert(true);

    try {
      const response = await axios.put(
        `${apiUrl}api/alert/updateAlert/${currentTeamId}`,
        formData2,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Updated successfully.", {
        position: "bottom-right",
        autoClose: 1000,
      });

      handleReset();
      getAlert();
    } catch (error) {
      toast.error("Cannot update. Please try again.", {
        position: "bottom-right",
        autoClose: 2000,
      });
    } finally {
      setAlert(false);
    }
  };

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleChange = async (e) => {
    const { name, type, checked, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
      // courseId: "",
    }));
    setIsChecked(e.target.checked);
  };
  const handleChange4 = async (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
      courseId: "",
      audience: "",
    }));
  };

  const handleChange2 = async (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
      courseId: "",
      toId: "",
    }));

    if (value) {
      getUserByTypeId(value);
    } else {
      setVtype([]);
    }
  };
  const handleChange3 = async (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
      audience: "",
      toId: "",
    }));
  };
  const getFileExtension = (filePath) => {
    if (typeof filePath !== "string") return "";

    const parts = filePath.split(".");
    return parts.length > 1 ? parts.pop().split(/#|\?/)[0] : "";
  };
  const checkAudience = (postaudience, toId, courseId) => {
    if (toId) {
      const toIds = vAllUser.find((item) => item._id === toId);
      return toIds ? `${toIds.firstName} ${toIds.lastName}` : null;
    } else if (postaudience) {
      switch (postaudience) {
        case "7":
          return "Public";
        case "2":
          return "Teacher";
        case "3":
          return "Student";
        case "4":
          return "Parent";
        default:
          return null;
      }
    } else if (courseId) {
      const course = vcourse.find((item) => item._id === courseId);
      return course ? `${course.coursename}` : null;
    } else {
      return;
    }
  };
  useEffect(() => {
    getAlert();
    getCourse();
    getTeacher();
    getUsersAll();
  }, []);
  return (
    <>
      <Slidebar />
      <Main />
      <div className="ml-72 mr-8">
        <div className="text-left flex items-center justify-center">
          <div className="mx-auto w-full">
            <div className="bg-white overflow-hidden shadow rounded-lg border">
              <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                <dl className="sm:divide-y sm:divide-gray-200">
                  <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Title <span className="text-red-500">*</span>
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder=""
                        required
                      />
                    </dd>
                  </div>
                  <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Content <span className="text-red-500">*</span>
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <textarea
                        type="text"
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        rows="10"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder=""
                        required
                      />
                    </dd>
                  </div>
                  <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Photo | Attachment{" "}
                      {/* <span className="text-red-500"></span> */}
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {editteam ? (
                        <sup className="text-red-500">
                          If you choose other file. It will replace your files
                          with one file only.
                        </sup>
                      ) : (
                        ""
                      )}
                      <input
                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        id="multiple_files"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        type="file"
                        multiple
                      />
                    </dd>
                  </div>
                  <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Audience
                      <span className="text-red-500"></span>
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <select
                        id="audience"
                        name="audience"
                        value={formData.audience}
                        onChange={handleChange2}
                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                      >
                        {" "}
                        <option>Please select audience...</option>
                        <option value="7" selected>
                          Public
                        </option>
                        <option value="2">Teacher</option>
                        <option value="3">Student</option>
                        <option value="4">Parent</option>
                      </select>
                    </dd>
                  </div>
                  <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      <span className="text-red-500">(Or)</span> To Specific{" "}
                      {/* <sup className="text-blue-500">
                        (Please select audience first)
                      </sup>
                      <span className="text-red-500"></span> */}
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <select
                        id="toId"
                        name="toId"
                        value={formData.toId}
                        onChange={handleChange4}
                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                      >
                        {" "}
                        <option>Please select specific person...</option>
                        {/* {vtype.map((item) => (
                          <option value={item._id} key={item._id}>
                            {`${item.firstName} ${item.lastName}`} ||{" "}
                            {" Date of Birth : "}
                            {item.dob && formatDate(item.dob)}
                          </option>
                        ))} */}
                        {vAllUser.map((item) => (
                          <option value={item._id} key={item._id}>
                            {`${item.firstName} ${item.lastName}`} ||{" "}
                            {" Date of Birth : "}
                            {item.dob && formatDate(item.dob)}
                          </option>
                        ))}
                      </select>
                    </dd>
                  </div>
                  <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      <span className="text-red-500">(Or)</span> To Course
                      <span className="text-red-500"></span>
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <select
                        id="courseId"
                        name="courseId"
                        value={formData.courseId}
                        onChange={handleChange3}
                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                      >
                        {" "}
                        <option>Please select course...</option>
                        {vcourse.map((user) => (
                          // <option value={item._id} key={item._id}>
                          //   {item.coursename}
                          // </option>
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
                      Active Alert?
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
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
                Post
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
                placeholder="Search for title..."
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
                <th scope="col" className="px-6 py-3 text-center">
                  Attachment
                </th>
                <th scope="col" className="px-6 py-3 w-48">
                  Title
                </th>
                <th scope="col" className="px-6 py-3 w-72">
                  Content
                </th>
                <th scope="col" className="px-6 py-3 w-72 text-center">
                  Audience
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Create Date
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
                  <td className="px-6 py-4 w-24 h-24 text-blue-500 font-bold text-center">
                    {[
                      "jpg",
                      "png",
                      "gif",
                      "bmp",
                      "tif",
                      "tiff",
                      "webp",
                      "heif",
                      "heic",
                      "jpeg",
                    ].includes(getFileExtension(user.path)) ? (
                      <img src={`${apiUrl}${user.path}`} alt={user.filename} />
                    ) : (
                      <span className="text-green-500 uppercase">
                        {getFileExtension(user.path)}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-blue-500 font-bold">
                    {user.title}
                  </td>

                  <td className="px-6 py-4">
                    {user.content.length > 150 ? (
                      <>
                        {user.content.substring(0, 150)}...
                        <button
                          onClick={() => handleEdit(user)}
                          className="text-blue-500 underline"
                        >
                          view more
                        </button>
                      </>
                    ) : (
                      user.content
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-green-500 font-bold">
                      {checkAudience(
                        user.postaudience,
                        user.toId,
                        user.courseId
                      )}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    {user.status ? (
                      <i className="ri-eye-fill text-2xl text-green-500"></i>
                    ) : (
                      <i className="ri-eye-off-fill text-2xl"></i>
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <FormattedDate date={user.createdDate} />
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
                      onDelete={() => handleDelete(user.codeTitle)}
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
                  Total Alert :
                </li>
                <li className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 border border-gray-300 rounded-e-lg dark:text-gray-400 bg-blue-700 text-white">
                  {teams.length}
                </li>
              </ul>
            </div>
          )}
        </div>

        <ToastContainer />
      </div>
    </>
  );
};

export default ManageAlert;
