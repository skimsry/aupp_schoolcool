//import React from "react";
// import "../../input.css";
// import "../../index.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
const apiUrl = process.env.REACT_APP_APIURL;

const TextCarousel = () => {
  const [tslideshow, setTslideshow] = useState([]);
  const getTslideshow = async () => {
    try {
      const response = await axios.get(`${apiUrl}api/tslideshow/getTslideshow`);
      setTslideshow(response.data);
    } catch (error) {
      console.error("Failed to fetch map data.", error);
    }
  };
  useEffect(() => {
    getTslideshow();
  }, [apiUrl]);
  return (
    <>
      {tslideshow.map((item) => (
        <div
          key={item._id}
          className="absolute top-0 right-20 bg-white bg-opacity-90 p-8 md:p-12 lg:p-16 rounded"
          style={{ width: "480px" }}
        >
          <h2 className="text-[#003070] text-xl md:text-2xl lg:text-3xl font-bold mb-4 mt-4">
            {item.infrontStext}
          </h2>
          <p className="text-gray-700 text-sm md:text-base lg:text-lg">
            {item.infronttext}
          </p>
        </div>
      ))}
    </>
  );
};

export default TextCarousel;
