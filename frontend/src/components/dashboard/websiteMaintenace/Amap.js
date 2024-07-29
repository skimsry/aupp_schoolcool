// import React, { useState, useEffect, useContext } from "react";
// import Slidebar from "../partial/Slidebar";
// import Main from "../partial/Main";
// import "../../../input.css";
// import "../../../index.css";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Map from "../../home/Map";
// //test
// import { UserContext } from "../../../ctx/UserContextProvider";
// import { Navigate } from "react-router-dom";
// const apiUrl = process.env.REACT_APP_APIURL;

// function Amap() {
//   const [showMap, setShowMap] = useState([]);
//   const getMap = async () => {
//     try {
//       const response = await axios.get(`${apiUrl}api/map/getMap`);
//       setShowMap(response.data);
//     } catch (error) {
//       toast.error("Failed to fetch map data.", {
//         position: "bottom-right",
//         autoClose: 3000,
//       });
//     }
//   };

//   const handleSubmit = async (mapId, linkMap) => {
//     const emptyFields = showMap.filter((map) => map.linkMap.trim() === "");
//     if (emptyFields.length > 0) {
//       toast.error("Cannot empty this field to update.", {
//         position: "bottom-right",
//         autoClose: 3000,
//       });
//     } else {
//       // Proceed with form submission
//       console.log("Form submitted", showMap);

//       try {
//         const updatedMapData = {
//           linkMap: linkMap,
//           updateDate: new Date(),
//         };
//         // const response = await axios.put(
//         //   `${apiUrl}api/map/updateMap/66a47e38e2b9de22004a8069`, // userId should be passed here
//         //   updatedMapData
//         // );
//         const response = await axios.put(
//           `${apiUrl}api/map/updateMap/${mapId}`,
//           updatedMapData
//         );

//         toast.success("Updated successfully.", {
//           position: "bottom-right",
//           autoClose: 1000,
//         });
//         getMap();
//       } catch (error) {
//         //setLoading(false);
//         toast.error("Cannot update. Please try again.", {
//           position: "bottom-right",
//           autoClose: 2000,
//         });
//       } finally {
//         //setLoading(false);
//       }
//     }
//   };

//   const handleChange = (e, index) => {
//     const { value } = e.target;
//     const updatedMap = [...showMap];
//     updatedMap[index] = { ...updatedMap[index], linkMap: value };
//     setShowMap(updatedMap);
//   };

//   useEffect(() => {
//     getMap();
//   }, [apiUrl]);

//   return (
//     <>
//       <Slidebar />
//       <Main />
//       <div className="ml-72 mr-8">
//         <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white text-left">
//           How to update Map Location:
//         </h2>
//         <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400 text-left mb-4">
//           <li>Go to Google Maps and find the location you want.</li>
//           <li>Click on "Share" and then "Embed a map."</li>
//           <li>Copy the src from iframe code provided and paste it.</li>
//         </ul>
//         {showMap.map((maps, index) => (
//           <form className="flex items-center mb-4" key={maps._id}>
//             <label htmlFor="simple-search" className="sr-only">
//               Search
//             </label>
//             <div className="relative w-full">
//               <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
//                 <svg
//                   className="w-4 h-4 text-gray-500 dark:text-gray-400"
//                   aria-hidden="true"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M12 11c1.656 0 3-1.344 3-3S13.656 5 12 5s-3 1.344-3 3 1.344 3 3 3zM12 2a7 7 0 017 7c0 5.25-7 13-7 13S5 14.25 5 9a7 7 0 017-7z"
//                   />
//                 </svg>
//               </div>
//               <input
//                 type="text"
//                 id="simple-search"
//                 value={maps.linkMap}
//                 onChange={(e) => handleChange(e, index)}
//                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                 placeholder="Search map on Google"
//                 required
//               />
//             </div>
//             <button
//               type="button"
//               onClick={(e) => handleSubmit(maps._id, maps.linkMap)}
//               className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//             >
//               <svg
//                 className="w-4 h-4"
//                 aria-hidden="true"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 strokeWidth="2"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2zM7 3v4h4V3M7 15h10"
//                 />
//               </svg>
//               <span className="sr-only">Save</span>
//             </button>
//           </form>
//         ))}
//         <Map />
//         <ToastContainer />
//       </div>
//     </>
//   );
// }

// export default Amap;

import React, { useState, useEffect, useContext } from "react";
import Slidebar from "../partial/Slidebar";
import Main from "../partial/Main";
import "../../../input.css";
import "../../../index.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Map from "../../home/Map";
//test
import { UserContext } from "../../../ctx/UserContextProvider";
const apiUrl = process.env.REACT_APP_APIURL;

function Amap() {
  const { getSMap, sMap, setSMap } = useContext(UserContext);

  //const [showMap, setShowMap] = useState([]);
  // const getMap = async () => {
  //   try {
  //     const response = await axios.get(`${apiUrl}api/map/getMap`);
  //     setShowMap(response.data);
  //   } catch (error) {
  //     toast.error("Failed to fetch map data.", {
  //       position: "bottom-right",
  //       autoClose: 3000,
  //     });
  //   }
  // };
  //console.log(sMap);
  const handleSubmit = async (mapId, linkMap) => {
    // const emptyFields = showMap.filter((map) => map.linkMap.trim() === "");
    const emptyFields = sMap.filter((map) => map.linkMap.trim() === "");
    if (emptyFields.length > 0) {
      toast.error("Cannot empty this field to update.", {
        position: "bottom-right",
        autoClose: 3000,
      });
    } else {
      // Proceed with form submission
      console.log("Form submitted", sMap);

      try {
        const updatedMapData = {
          linkMap: linkMap,
          updateDate: new Date(),
        };
        // const response = await axios.put(
        //   `${apiUrl}api/map/updateMap/66a47e38e2b9de22004a8069`, // userId should be passed here
        //   updatedMapData
        // );
        const response = await axios.put(
          `${apiUrl}api/map/updateMap/${mapId}`,
          updatedMapData
        );

        toast.success("Updated successfully.", {
          position: "bottom-right",
          autoClose: 1000,
        });
        // getMap();
        getSMap();
      } catch (error) {
        //setLoading(false);
        toast.error("Cannot update. Please try again.", {
          position: "bottom-right",
          autoClose: 2000,
        });
      } finally {
        //setLoading(false);
      }
    }
  };

  const handleChange = (e, index) => {
    const { value } = e.target;
    // const updatedMap = [...showMap];
    const updatedMap = [...sMap];
    updatedMap[index] = { ...updatedMap[index], linkMap: value };
    // setShowMap(updatedMap);
    setSMap(updatedMap);
  };

  useEffect(() => {
    // getMap();
    getSMap();
  }, [apiUrl]);

  return (
    <>
      <Slidebar />
      <Main />
      <div className="ml-72 mr-8">
        <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white text-left">
          How to update Map Location:
        </h2>
        <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400 text-left mb-4">
          <li>Go to Google Maps and find the location you want.</li>
          <li>Click on "Share" and then "Embed a map."</li>
          <li>Copy the src from iframe code provided and paste it.</li>
        </ul>
        {sMap.map((maps, index) => (
          <form className="flex items-center mb-4" key={maps._id}>
            <label htmlFor="simple-search" className="sr-only">
              Search
            </label>
            <div className="relative w-full">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 11c1.656 0 3-1.344 3-3S13.656 5 12 5s-3 1.344-3 3 1.344 3 3 3zM12 2a7 7 0 017 7c0 5.25-7 13-7 13S5 14.25 5 9a7 7 0 017-7z"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="simple-search"
                value={maps.linkMap}
                onChange={(e) => handleChange(e, index)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search map on Google"
                required
              />
            </div>
            <button
              type="button"
              onClick={(e) => handleSubmit(maps._id, maps.linkMap)}
              className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2zM7 3v4h4V3M7 15h10"
                />
              </svg>
              <span className="sr-only">Save</span>
            </button>
          </form>
        ))}
        <Map />
        <ToastContainer />
      </div>
    </>
  );
}

export default Amap;
