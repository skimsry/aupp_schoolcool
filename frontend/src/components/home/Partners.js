import React from "react";
import "../../input.css";
import "../../index.css";
import ATC from "../../assets/ATC.png";
import UA from "../../assets/UA.png";
import AUPPHS from "../../assets/AUPPHS-FA.png";
import Fort from "../../assets/Fort-Hays.png";

const Partners = () => {
  return (
    <div className="flex flex-col items-center bg-white py-8">
      <hr className="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700"></hr>
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-blue-800 sm:text-4xl pb-10">
          Our Partners
        </h2>
        <div className="flex justify-center space-x-8">
          <div className="flex flex-col items-center">
            <img
              src={UA}
              alt="The University of Arizona"
              className="h-48 mb-2"
            />
          </div>
          <div className="flex flex-col items-center">
            <img
              src={Fort}
              alt="FORT HAYS STATE UNIVERSITY"
              className="h-48 mb-2"
            />
          </div>
          <div className="flex flex-col items-center">
            <img src={AUPPHS} alt="AUPP HIGH SCHOOL" className="h-48 mb-2" />
          </div>
          <div className="flex flex-col items-center">
            <img src={ATC} alt="AUPP TECHNOLOGY CENTER" className="h-48 mb-2" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Partners;
