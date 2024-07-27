import React, { useContext, useEffect, useState } from "react";
import "../../input.css";
import "../../index.css";
import axios from "axios";
import { UserContext } from "../../ctx/UserContextProvider";
const apiUrl = process.env.REACT_APP_APIURL;

const Map = () => {
  const { getSMap, sMap } = useContext(UserContext);
  // const [showMap, setShowMap] = useState([]);
  // const getMap = async () => {
  //   try {
  //     const response = await axios.get(`${apiUrl}api/map/getMap`);
  //     setShowMap(response.data);
  //     // setLoading(false);
  //   } catch (error) {
  //     // setError(error);
  //     // setLoading(false);
  //   }
  // };
  useEffect(() => {
    //getMap();
    getSMap();
  }, [apiUrl]);
  return (
    <div>
      {sMap.map((maps) => (
        <iframe
          key={maps._id}
          src={maps.linkMap}
          width="100%"
          height="450"
          style={{ border: "0" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="map"
        ></iframe>
      ))}
    </div>
  );
};

export default Map;
