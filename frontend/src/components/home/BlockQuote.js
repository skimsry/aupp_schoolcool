import React, { useEffect, useState } from "react";
import axios from "axios";
const apiUrl = process.env.REACT_APP_APIURL;
const BlockQuote = () => {
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
      {tslideshow.map((item, index) => (
        <blockquote
          key={index}
          className="w-1/2 relative border-s-4 ps-4 sm:ps-6 dark:border-neutral-700 pt-10 ms-4"
        >
          <p className="text-gray-800 sm:text-xl dark:text-white">
            <em>{item.slogantext}</em>
          </p>

          <footer className="mt-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <img
                  className="size-10 rounded-full"
                  src={item.artistprofile}
                  alt="Image Description"
                />
              </div>
              <div className="ms-4">
                <div className="text-base font-semibold text-gray-800 dark:text-neutral-400">
                  {item.name}
                </div>
                <div className="text-xs text-gray-500 dark:text-neutral-500">
                  {item.position}
                </div>
              </div>
            </div>
          </footer>
        </blockquote>
      ))}
    </>
  );
};
export default BlockQuote;
