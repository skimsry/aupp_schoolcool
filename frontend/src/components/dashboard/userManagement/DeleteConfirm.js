import React, { useState, useEffect, useContext } from "react";

import "../../../input.css";
import "../../../index.css";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DeleteConfirm = ({ onDelete, className, ico, text, labelButton }) => {
  const handleDelete = () => {
    toast.warn(
      ({ closeToast }) => (
        <div>
          {/* Are you sure you want to delete? */}
          {text}
          <div className="mt-4 flex flex-row justify-center items-center">
            <button
              className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
              onClick={() => {
                onDelete();
                closeToast();
              }}
            >
              Yes
            </button>
            <button
              className="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900"
              onClick={closeToast}
            >
              No
            </button>
          </div>
        </div>
      ),
      { autoClose: false }
    );
  };

  return (
    <button
      //   className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
      className={className}
      onClick={handleDelete}
    >
      {/* <i className="ri-delete-bin-line"></i> */}
      <i className={ico}></i>
      {labelButton}
    </button>
  );
};

export default DeleteConfirm;
