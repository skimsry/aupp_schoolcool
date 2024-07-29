// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import FormattedDate from "../FormattedDate";
// import Slidebar from "../partial/Slidebar";
// import Main from "../partial/Main";

// const Aannoucement = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const usersPerPage = 5;
//   const capitalize = (str) => {
//     if (!str) return "";
//     return str.charAt(0).toUpperCase() + str.slice(1).toUpperCase();
//   };
//   const apiUrl = process.env.REACT_APP_APIURL;

//   useEffect(() => {
//     const getUsers = async () => {
//       try {
//         // const response = await axios.get();

//         const response = await axios.get(
//           `${apiUrl}api/users/getUsers`
//           // `http://localhost:3001api/users/getUsers`
//         );

//         setUsers(response.data);
//         setLoading(false);

//         //return response.data;
//       } catch (error) {
//         setError(error);
//         setLoading(false);
//       }
//     };

//     getUsers();
//   }, [apiUrl]);
//   // Pagination logic
//   const indexOfLastUser = currentPage * usersPerPage;
//   const indexOfFirstUser = indexOfLastUser - usersPerPage;
//   const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);
//   const handlePrevious = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   const handleNext = () => {
//     if (currentPage < Math.ceil(users.length / usersPerPage)) {
//       setCurrentPage(currentPage + 1);
//     }
//   };
//   const handleDelete = async (userId, e) => {
//     //e.preventDefault();
//     setLoading(true);
//     try {
//       const response = await axios.post(`${apiUrl}api/users/delete/${userId}`);
//       setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
//       toast.success("User deleted successfully.", {
//         position: "bottom-right",
//         autoClose: 2000,
//       });
//     } catch (error) {
//       setLoading(false);
//       toast.error("Cannot delete. Please try another.", {
//         position: "bottom-right",
//         autoClose: 2000,
//       });
//     } finally {
//       setLoading(false);
//     }
//   };
//   return (
//     <>
//       <Slidebar />
//       <Main />
//       <div className="ml-72 mr-8">
//         <div className="text-left flex items-center justify-center p-12">
//           <div className="mx-auto w-full">
//             <div className="bg-white overflow-hidden shadow rounded-lg border">
//               <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
//                 <dl className="sm:divide-y sm:divide-gray-200">
//                   <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
//                     <dt className="text-sm font-medium text-gray-500">
//                       Image of Announcement
//                     </dt>
//                     <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
//                       <input
//                         class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
//                         id="multiple_files"
//                         type="file"
//                         multiple
//                       />
//                     </dd>
//                   </div>
//                   <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
//                     <dt className="text-sm font-medium text-gray-500">
//                       Subject
//                     </dt>
//                     <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
//                       <input
//                         type="text"
//                         id="first_name"
//                         className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                         placeholder=""
//                         required
//                       />
//                     </dd>
//                   </div>
//                   <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
//                     <dt className="text-sm font-medium text-gray-500">
//                       Content
//                     </dt>
//                     <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
//                       <input
//                         type="text"
//                         id="first_name"
//                         className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                         placeholder=""
//                         required
//                       />
//                     </dd>
//                   </div>
//                 </dl>
//               </div>
//             </div>
//             <button
//               type="button"
//               className="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
//             >
//               Clear
//             </button>
//             <button
//               type="button"
//               className="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
//             >
//               Update
//             </button>
//             <button
//               type="button"
//               className="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
//             >
//               Add
//             </button>
//           </div>
//         </div>
//         <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
//           <form className="max-w-md mx-auto mb-4 pl-4">
//             <label
//               htmlFor="default-search"
//               className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
//             >
//               Search
//             </label>
//             <div className="relative">
//               <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
//                 <svg
//                   className="w-4 h-4 text-gray-500 dark:text-gray-400"
//                   aria-hidden="true"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 20 20"
//                 >
//                   <path
//                     stroke="currentColor"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
//                   />
//                 </svg>
//               </div>
//               <input
//                 type="search"
//                 id="default-search"
//                 className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                 placeholder="Search for subject..."
//                 required
//               />
//               <button
//                 type="submit"
//                 className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//               >
//                 Search
//               </button>
//             </div>
//           </form>

//           <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
//             <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
//               <tr>
//                 <th scope="col" className="p-4">
//                   <div className="flex items-center">
//                     <label htmlFor="number" className="font-bold">
//                       #
//                     </label>
//                   </div>
//                 </th>
//                 <th scope="col" className="px-6 py-3">
//                   Image of Announcement
//                 </th>
//                 <th scope="col" className="px-6 py-3">
//                   Subject
//                 </th>
//                 <th scope="col" className="px-6 py-3">
//                   Content
//                 </th>

//                 <th scope="col" className="px-6 py-3">
//                   Create Date
//                 </th>
//                 <th scope="col" className="px-6 py-3">
//                   Action
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {currentUsers.map((user, i) => (
//                 <tr
//                   key={user._id}
//                   className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
//                 >
//                   <td className="w-4 p-4">
//                     <div className="flex items-center">
//                       <label htmlFor="1" className="font-bold">
//                         {indexOfFirstUser + i + 1}.
//                       </label>
//                     </div>
//                   </td>
//                   <th
//                     scope="row"
//                     className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
//                   >
//                     <i className="ri-user-3-line text-blue-500 text-2xl"></i>
//                     <div className="ps-3">
//                       <div className="text-base font-semibold">
//                         {`${capitalize(user.firstName)} ${capitalize(
//                           user.lastName
//                         )}`}
//                       </div>
//                       <div className="font-normal text-gray-500">
//                         {user.email}
//                       </div>
//                     </div>
//                   </th>
//                   <td className="px-6 py-4">{user.gender}</td>
//                   <td className="px-6 py-4">
//                     <FormattedDate date={user.dob} />
//                   </td>

//                   <td className="px-6 py-4">
//                     <FormattedDate date={user.createdDate} />
//                   </td>
//                   <td className="px-6 py-4">
//                     <button
//                       type="button"
//                       className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
//                     >
//                       <i className="ri-file-edit-line"></i>
//                     </button>
//                     <button
//                       type="button"
//                       className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
//                     >
//                       <i className="ri-eye-line"></i>
//                     </button>
//                     <button
//                       type="button"
//                       key={user._id}
//                       onClick={(e) => handleDelete(user._id, e)}
//                       className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
//                     >
//                       <i className="ri-delete-bin-line"></i>
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           <div className="flex justify-center mt-4 mb-4">
//             <nav aria-label="Page navigation example">
//               <ul className="inline-flex -space-x-px text-base h-10">
//                 <li>
//                   <a
//                     href="#"
//                     onClick={handlePrevious}
//                     className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
//                   >
//                     Previous
//                   </a>
//                 </li>

//                 {Array.from({
//                   length: Math.ceil(users.length / usersPerPage),
//                 }).map((_, i) => (
//                   <li>
//                     <a
//                       href="#"
//                       key={i}
//                       onClick={() => paginate(i + 1)}
//                       className={`flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
//                         currentPage === i + 1
//                           ? "bg-blue-500 text-white"
//                           : "bg-white text-blue-500"
//                       }`}
//                     >
//                       {i + 1}
//                     </a>
//                   </li>
//                 ))}
//                 <li>
//                   <a
//                     href="#"
//                     onClick={handleNext}
//                     className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
//                   >
//                     Next
//                   </a>
//                 </li>
//               </ul>
//             </nav>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Aannoucement;

import React, { useState } from "react";
import Slidebar from "../partial/Slidebar";
import Main from "../partial/Main";
import "../../../input.css";
import "../../../index.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MessageTeam from "./MessageTeam";
import OurTeam from "./OurTeam";
import MessageAnnouncement from "./announcement/MessageAnnouncement";
import OurAnnouncement from "./announcement/OurAnnouncement";

function Aannoucement() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      name: "Message",
      content: <MessageAnnouncement />,
      icon: "ri-mail-send-line",
    },
    {
      name: "Our Announcements",
      content: <OurAnnouncement />,
      icon: "ri-megaphone-line",
    },
  ];
  return (
    <>
      <Slidebar />
      <Main />
      <div className="ml-72 mr-8">
        <div className="flex border-b border-gray-200">
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`px-4 py-2 transition-colors duration-300 ${
                activeTab === index
                  ? "border-b-2 border-blue-500 text-blue-500"
                  : "border-b-2 border-transparent text-gray-500 hover:text-blue-500"
              }`}
              onClick={() => setActiveTab(index)}
            >
              <i className={`${tab.icon} mr-2`}></i> {tab.name}
            </button>
          ))}
        </div>
        <div className="p-4">{tabs[activeTab].content}</div>
      </div>
    </>
  );
}

export default Aannoucement;
