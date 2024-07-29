import React, { useState, useEffect } from "react";
import axios from "axios";
const apiUrl = process.env.REACT_APP_APIURL;
const Partners = () => {
  const [partners, setPartners] = useState([]);
  const getPartner = async () => {
    try {
      const response = await axios.get(`${apiUrl}api/partner/getPartner`);

      setPartners(response.data);
    } catch (error) {}
  };
  useEffect(() => {
    getPartner();
  }, [apiUrl]);
  return (
    <div className="flex flex-col items-center bg-white py-8">
      <hr className="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700"></hr>
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-blue-800 sm:text-4xl pb-10">
          Our Partners
        </h2>
        <div className="grid grid-cols-4 gap-4 justify-center">
          {partners.map((partners) => (
            <div className="flex flex-col items-center" key={partners._id}>
              <img
                src={partners.logoimg}
                alt={partners.name}
                className="h-48 mb-2"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Partners;
