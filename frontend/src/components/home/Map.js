import React from "react";
import "../../input.css";
import "../../index.css";
const mapSrc =
  "https://www.google.com/maps/embed?pb=!1m19!1m8!1m3!1d62530.07620246713!2d104.87727945277423!3d11.614097547984276!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x31095177ee61fd7d%3A0xa66cfdf83a58b2ae!2sAmerican%20University%20of%20Phnom%20Penh%20Kilometer%206%20278H%2C%20Street%20201R%2C%20Kroalkor%20Village%2C%20Unnamed%20Road%20Phnom%20Penh!3m2!1d11.616000099999999!2d104.9009457!5e0!3m2!1sen!2skh!4v1718968051406!5m2!1sen!2skh";

const Map = () => {
  return (
    <iframe
      src={mapSrc}
      width="100%"
      height="450"
      style={{ border: "0" }}
      allowfullscreen=""
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
      title="map"
    ></iframe>
  );
};

export default Map;
