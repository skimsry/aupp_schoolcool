import React, { useState, useEffect, useRef, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import Slidebar from "../partial/Slidebar";
import Main from "../partial/Main";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormattedDate from "../FormattedDate";
// import DeleteConfirm from "../userManagement/DeleteConfirm";
// import { Link } from "react-router-dom";
import { UserContext } from "../../../ctx/UserContextProvider";
const apiUrl = process.env.REACT_APP_APIURL;
const Alert = () => {
  const [files, setFiles] = useState([]);
  const [alert, setAlert] = useState(false);
  const fileInputRef = useRef(null);
  const [teams, setTeams] = useState([]);
  const [editteam, setEditteam] = useState(false);
  const [currentTeamId, setCurrentTeamId] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const teamsPerPage = 5;
  const { user, token } = useContext(UserContext);
  const UserID = user._id;
  const decodedToken = jwtDecode(token);
  const UserType = decodedToken.type;
  const UserFOS = decodedToken.fos;
  const [formData, setFormData] = useState({
    codeTitle: "",
    title: "",
    content: "",
    audience: "",
    toId: "",
    courseId: "",
    filename: "",
    path: "",
    status: false,
  });
  const [vtype, setVtype] = useState([]);
  const [vcourse, setVcourse] = useState([]);
  const [vstudent, setVstudent] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [vcodeTitle, setVcodeTitle] = useState([]);
  const [vclass, setVclass] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filteredData2, setFilteredData2] = useState([]);
  const [filteredData3, setFilteredData3] = useState([]);

  const getAlert = async () => {
    try {
      const response = await axios.get(`${apiUrl}api/alert/getAlertStatus`);

      setTeams(response.data);
    } catch (error) {}
  };
  const getAlertStudent = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}api/alert/getAlertStudentByCriteria`,
        {
          params: {
            courseId: filteredData.map((i) => i.course_id),
            toId: UserID,
            postaudience: UserType,
          },
        }
      );

      setTeams(response.data);
    } catch (error) {}
  };
  const getAlertParent = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}api/alert/getAlertStudentByCriteriaP`,
        {
          params: {
            courseId: filteredData2.map((i) => i.course_id),
            toId: UserFOS,
            postaudience: UserType,
            fos: UserID,
          },
        }
      );

      setTeams(response.data);
    } catch (error) {}
  };
  const getAlertTeacher = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}api/alert/getAlertStudentByCriteriaT`,
        {
          params: {
            courseId: filteredData3.map((i) => i._id),
            toId: UserID,
            postaudience: UserType,
          },
        }
      );

      setTeams(response.data);
    } catch (error) {}
  };
  const getCourse = async () => {
    try {
      const response = await axios.get(`${apiUrl}api/course/getCourseStatus`);

      setVcourse(response.data);
    } catch (error) {}
  };
  const getUserByStudent = async () => {
    try {
      const response = await axios.get(`${apiUrl}api/users/getUsers`);

      setVstudent(response.data);
    } catch (error) {}
  };

  const getAlertByCodeTitle = async (codeTitle) => {
    try {
      const response = await axios.get(
        `${apiUrl}api/alert/getAlertByCodeTitle?codeTitle=${codeTitle}`
      );

      setVcodeTitle(response.data);
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
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const maxFiles = 10;
  //   if (files.length > maxFiles) {
  //     toast.error(`You can only upload a maximum of ${maxFiles} files.`, {
  //       position: "bottom-right",
  //       autoClose: 2000,
  //     });
  //     setFiles("");
  //     return;
  //   }
  //   if (!formData.title || !formData.content) {
  //     toast.error("Fields cannot be empty *.", {
  //       position: "bottom-right",
  //       autoClose: 3000,
  //     });
  //     return;
  //   }

  //   const formData2 = new FormData();
  //   formData2.append("title", formData.title);
  //   formData2.append("content", formData.content);
  //   formData2.append("postaudience", formData.audience);
  //   formData2.append("toId", formData.toId);
  //   formData2.append("courseId", formData.courseId);
  //   formData2.append("status", formData.status);

  //   for (let i = 0; i < files.length; i++) {
  //     formData2.append("photos", files[i]);
  //   }

  //   setAlert(true);

  //   try {
  //     const response = await axios.post(
  //       `${apiUrl}api/admin_alert_upload`,
  //       formData2,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       }
  //     );

  //     toast.success("Alert posted successfully.", {
  //       position: "bottom-right",
  //       autoClose: 1000,
  //     });

  //     handleReset();
  //     getAlert();
  //   } catch (error) {
  //     toast.error("Cannot post alert. Please try again.", {
  //       position: "bottom-right",
  //       autoClose: 2000,
  //     });
  //   } finally {
  //     setAlert(false);
  //   }
  // };

  // const handleReset = () => {
  //   setEditteam(false);
  //   setFormData({
  //     codeTitle: "",
  //     title: "",
  //     content: "",
  //     audience: "",
  //     toId: "",
  //     courseId: "",
  //     status: false,
  //   });
  //   setFiles("");
  //   if (fileInputRef.current) {
  //     fileInputRef.current.value = null;
  //   }
  // };
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

  // const handleDelete = async (userId, e) => {
  //   try {
  //     const response = await axios.post(`${apiUrl}api/alert/delete/${userId}`);
  //     setTeams((prevteams) =>
  //       prevteams.filter((user) => user.codeTitle !== userId)
  //     );
  //     toast.success("This Alert deleted successfully.", {
  //       position: "bottom-right",
  //       autoClose: 2000,
  //     });

  //     setSearchResults([]);
  //   } catch (error) {
  //     toast.error("Cannot delete. Please try another.", {
  //       position: "bottom-right",
  //       autoClose: 2000,
  //     });
  //   } finally {
  //   }
  // };

  const handleEdit = (user) => {
    setShowModal(true);
    setEditteam(true);
    getAlertByCodeTitle(user.codeTitle);
    setCurrentTeamId(user.codeTitle);
    setFormData({
      codeTitle: user.codeTitle,
      title: user.title,
      content: user.content,
      audience: user.postaudience,
      toId: user.toId,
      courseId: user.courseId,
      filename: user.filename,
      path: user.path,
      status: user.status,
      createdDate: user.createdDate,
    });
    //console.log(user.codeTitle);
  };

  const getFileExtension = (filePath) => {
    if (typeof filePath !== "string") return "";

    const parts = filePath.split(".");
    return parts.length > 1 ? parts.pop().split(/#|\?/)[0] : "";
  };
  const checkAudience = (postaudience, toId, courseId) => {
    if (toId) {
      const toIds = vstudent.find((item) => item._id === toId);
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
  const getClass = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}api/classenrollment/getClassenrollment`
      );

      setVclass(response.data);
    } catch (error) {}
  };

  const getCourseById = () => {
    const filtered = vclass.filter((i) => i.student_id === user._id);
    setFilteredData(filtered);
    //console.log(filteredData);
  };
  const getCourseById2 = () => {
    const filtered = vclass.filter((i) => i.student_id === UserFOS);
    setFilteredData2(filtered);
  };
  const getCourseById3 = () => {
    const filtered = vcourse.filter((i) => i.teacherid === UserID);
    setFilteredData3(filtered);
  };
  const checkPermission = (UserType) => {
    switch (UserType) {
      case 1:
        return getAlert();
      case 2:
        return getAlertTeacher();
      case 3:
        return getAlertStudent();
      case 4:
        return getAlertParent();
      default:
        return;
    }
  };

  useEffect(() => {
    checkPermission(UserType);
    // getAlert();
    getCourse();
    getClass();
    getUserByStudent();
    getCourseById();
    getCourseById2();
    getCourseById3();
  }, [vclass, user._id]);
  return (
    <>
      <Slidebar />
      <Main />
      {/* <p>ToID{UserID}</p>
      <p>ToAudience{UserType}</p>
      <ul>
        {filteredData.map((i) => (
          <li key={i.course_id}>
            {i.course_id} {i.course_name}
          </li>
        ))} 
      </ul>*/}
      {/* <p>Hell0={UserFOS}</p> */}
      <div className="ml-72 mr-8">
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
                <th scope="col" className="px-6 py-3 text-center">
                  Audience
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
                    <FormattedDate date={user.createdDate} />
                  </td>

                  <td className="px-6 py-4 text-center">
                    <button
                      type="button"
                      key={user._id}
                      onClick={() => handleEdit(user)}
                      className="text-white bg-green-500 hover:bg-green-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                      {/* <i className="ri-eye-line"></i> */}
                      View
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
      {showModal ? (
        <>
          <div className="ml-72 mr-8 justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl min-w-full">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t bg-blue-800">
                  {/* <sup className="text-white">Alert-{formData.codeTitle}</sup> */}

                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="text-white h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                  <div className="w-full">
                    <h3 className="text-2xl font-semibold text-blue-800 text-center">
                      {formData.title}
                    </h3>
                    <span className="text-green-500">
                      <FormattedDate date={formData.createdDate} />
                    </span>
                  </div>
                  <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                    {formData.content}
                  </p>
                </div>
                <div className="text-start">
                  <h1 className="text-ml font-semibold text-blue-800 ps-8">
                    Attachment:
                  </h1>
                  <ul>
                    {vcodeTitle.map((item) => (
                      <li key={item._id}>
                        <a
                          href={`${apiUrl}${item.path}`}
                          download={item.filename}
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline ps-16"
                        >
                          <i class="ri-file-download-line"></i> {item.filename}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default Alert;
