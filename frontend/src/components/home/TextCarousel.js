import React from "react";
import "../../input.css";
import "../../index.css";

const TextCarousel = () => {
  return (
    <div
      className="absolute top-0 right-20 bg-white bg-opacity-90 p-8 md:p-12 lg:p-16 rounded"
      style={{ width: "480px" }}
    >
      <h2 className="text-[#003070] text-xl md:text-2xl lg:text-3xl font-bold mb-4 mt-4">
        IBTSS 2024 International Conference.
      </h2>
      <p className="text-gray-700 text-sm md:text-base lg:text-lg">
        Integration of Business, Digital Technologies, and Social Sciences for a
        Sustainable ASEAN and Beyond.
      </p>
    </div>
  );
};

export default TextCarousel;
