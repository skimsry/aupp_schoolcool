import React from "react";
import Slidebar from "./dashboard/partial/Slidebar";
import Main from "./dashboard/partial/Main";

const UnauthorizedBanner = () => {
  return (
    <>
      <Slidebar />
      <div className="bg-red-700 text-white text-center py-4 px-6 rounded-md shadow-md ml-72 mr-8 mt-4">
        <h2 className="text-xl font-bold mb-2">Unauthorized Access</h2>
        <p className="text-md">
          You do not have permission to view this page. Please contact your
          administrator for more information.
        </p>
      </div>
      <Main />
    </>
  );
};

export default UnauthorizedBanner;
