import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormattedDate from "../../FormattedDate";
import Slidebar from "../../partial/Slidebar";
import Main from "../../partial/Main";
import DeleteConfirm from "../../userManagement/DeleteConfirm";
const apiUrl = process.env.REACT_APP_APIURL;
const OurAnnouncement = () => {
  const [profileimg, setProfileimag] = useState(null);
  const [name, setName] = useState("");
  const [alert, setAlert] = useState(false);
  const [position, setPosition] = useState("");
  const fileInputRef = useRef(null);
  const [teams, setTeams] = useState([]);
  const [editteam, setEditteam] = useState(false);
  const [currentTeamId, setCurrentTeamId] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const teamsPerPage = 5;
  const getTeam = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}api/announcement/getAnnouncement`
      );

      setTeams(response.data);
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
    if (!profileimg || !name || !position) {
      toast.error("Cannot empty fields *.", {
        position: "bottom-right",
        autoClose: 3000,
      });
    } else {
      setAlert(true);
      try {
        const response = await axios.post(
          `${apiUrl}api/announcement/register`,
          {
            title: name,
            content: position,
            imgcover: profileimg,
          }
        );

        toast.success("Updated successfully.", {
          position: "bottom-right",
          autoClose: 1000,
        });

        handleReset();
        getTeam();
      } catch (error) {
        //setLoading(false);
        toast.error("Cannot update. Please try again.", {
          position: "bottom-right",
          autoClose: 2000,
        });
      } finally {
        setAlert(false);
      }
    }
  };
  const handleFileChange = (e) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileimag(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  const handleReset = () => {
    setProfileimag(null);
    setName("");
    setPosition("");
    setEditteam(false);
    setCurrentTeamId(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
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
          `${apiUrl}api/announcement/getAnnouncementByName/${searchQuery}`
        );
        // setSearchResults([response.data]);
        setSearchResults(response.data);
        setCurrentPage(1);
      } catch (error) {
        toast.error("This announcement not found.", {
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
        `${apiUrl}api/announcement/delete/${userId}`
      );
      setTeams((prevteams) => prevteams.filter((user) => user._id !== userId));
      toast.success("This Announcement deleted successfully.", {
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
  // const handleEdit = () => {
  //   setEditteam(true);
  //   console.log("Hello");
  // };
  const handleEdit = (user) => {
    setEditteam(true);
    setCurrentTeamId(user._id);
    setName(user.title);
    setPosition(user.content);
    setProfileimag(user.imgcover);
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
    console.log(currentTeamId);
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!profileimg || !name || !position) {
      toast.error("Cannot have empty fields *.", {
        position: "bottom-right",
        autoClose: 3000,
      });
    } else {
      setAlert(true);
      try {
        const response = await axios.put(
          `${apiUrl}api/announcement/updateAnnouncement/${currentTeamId}`,
          {
            title: name,
            content: position,
            imgcover: profileimg,
          }
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
  useEffect(() => {
    getTeam();
  }, [apiUrl]);
  return (
    <>
      <Slidebar />
      <Main />

      <div className="text-left flex items-center justify-center p-12">
        <div className="mx-auto w-full">
          <div className="bg-white overflow-hidden shadow rounded-lg border">
            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
              <dl className="sm:divide-y sm:divide-gray-200">
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Cover image{" "}
                    <span className="text-red-500">* (920px X 613px)</span>
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <input
                      class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
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
                    Title <span className="text-red-500">*</span>
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <input
                      type="text"
                      id="first_name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
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
                      id="first_name"
                      value={position}
                      rows="4"
                      onChange={(e) => setPosition(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder=""
                      required
                    />
                  </dd>
                </div>
              </dl>
            </div>
          </div>
          {alert ? (
            <p className="text-red-500 pt-4">
              * Please wait less than 3 minutes. Because of upload profile
              image....
            </p>
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
              <th scope="col" className="px-6 py-3">
                Cover image
              </th>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Content
              </th>

              <th scope="col" className="px-6 py-3 text-center">
                Post Date
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
                <td className="px-6 py-4 w-48">
                  <img id={user._id} src={user.imgcover} alt={user.name} />
                </td>
                <td className="px-6 py-4 w-56 text-blue-500 font-bold">
                  {user.title}
                </td>

                <td className="px-6 py-4 w-96">{user.content}</td>
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
                Total Announcement :
              </li>
              <li className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 border border-gray-300 rounded-e-lg dark:text-gray-400 bg-blue-700 text-white">
                {teams.length}
              </li>
            </ul>
          </div>
        )}
      </div>

      <ToastContainer />
    </>
  );
};

export default OurAnnouncement;
