import React from "react";
import Carousel from "./Carousel";
import Map from "./Map";
import Partners from "./Partners";
import OurTeam from "./OurTeam";
import Activities from "./Activities";
import BlockQuote from "./BlockQuote";
const Home = () => {
  return (
    <>
      <Carousel />
      <BlockQuote />
      <Activities />
      <OurTeam />
      <Partners />
      <Map />
    </>
  );
};

export default Home;
