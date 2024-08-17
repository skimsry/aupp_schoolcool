import React, { useState, useEffect, useContext } from "react";
import Slidebar from "../partial/Slidebar";
import Main from "../partial/Main";
import "../../../input.css";
import "../../../index.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormattedDate from "../FormattedDate";
import DeleteConfirm from "../userManagement/DeleteConfirm";
import { UserContext } from "../../../ctx/UserContextProvider";

function SecondContact() {
  //const [scontact, setScontact] = useState([]);
  const [scontact, setScontact] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const scontactPerPage = 5;
  const { user, logout } = useContext(UserContext);
  const apiUrl = process.env.REACT_APP_APIURL;

  const getFastContact = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}api/secondcontact/getSecondcontact`
      );

      setScontact(response.data);
    } catch (error) {}
  };
  useEffect(() => {
    getFastContact();
  }, [apiUrl]);
  // Pagination logic
  const indexOfLastUser = currentPage * scontactPerPage;
  const indexOfFirstUser = indexOfLastUser - scontactPerPage;
  const currentscontact = (
    searchResults.length > 0 ? searchResults : scontact
  ).slice(indexOfFirstUser, indexOfLastUser);

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
        (searchResults.length > 0 ? searchResults : scontact).length /
          scontactPerPage
      )
    ) {
      setCurrentPage(currentPage + 1);
    }
  };
  const handleDelete = async (userId, e) => {
    try {
      const response = await axios.post(
        `${apiUrl}api/secondcontact/delete/${userId}`
      );
      setScontact((prevscontact) =>
        prevscontact.filter((user) => user._id !== userId)
      );
      toast.success("Message deleted successfully.", {
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

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (searchQuery) {
      try {
        const response = await axios.get(
          `${apiUrl}api/secondcontact/getMessageByEmail/${searchQuery}`
        );
        setSearchResults([response.data]);
        //adding code
        setCurrentPage(1);
        //stop
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
      setSearchResults([]);
      // setLoading(false);
    }
  };

  return (
    <>
      <Slidebar />
      <Main />

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
              placeholder="Search for email..."
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
                Full Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Subject
              </th>
              <th scope="col" className="px-6 py-3 w-96">
                Message
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Get Date
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {currentscontact.map((user, i) => (
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
                <td className="px-6 py-4 text-center">{user.fullname}</td>
                <td className="px-6 py-4 text-blue-500 font-bold">
                  {user.email}
                </td>

                <td className="px-6 py-4">{user.subject}</td>
                <td className="px-6 py-4">{user.message}</td>
                <td className="px-6 py-4 text-center">
                  <FormattedDate date={user.createdDate} />
                </td>
                <td className="px-6 py-4 text-center">
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
                  (searchResults.length > 0 ? searchResults : scontact).length /
                    scontactPerPage
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
                Total Message :
              </li>
              <li className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 border border-gray-300 rounded-e-lg dark:text-gray-400 bg-blue-700 text-white">
                {scontact.length}
              </li>
            </ul>
          </div>
        )}
      </div>
      <ToastContainer />
    </>
  );
}

export default SecondContact;
