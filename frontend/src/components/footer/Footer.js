import React from "react";
import "../../input.css";
import "../../index.css";

const Footer = () => {
  return (
    <footer className="bg-white rounded-lg shadow m-4 dark:bg-gray-800">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2024{" "}
          <a href="/" className="hover:underline">
            SchoolCool™
          </a>
          . All Rights Reserved.
        </span>
        <span className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
          Made by <b className="ml-3">SORN KIMSRY</b>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
