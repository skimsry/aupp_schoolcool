import React from "react";
import Carousel from "./Carousel";
import Map from "./Map";
import Partners from "./Partners";
import OurTeam from "./OurTeam";
import Activities from "./Activities";
const Home = () => {
  return (
    <>
      <Carousel />
      <Activities />
      <OurTeam />
      <Partners />
      <Map />
    </>
  );
};

export default Home;
