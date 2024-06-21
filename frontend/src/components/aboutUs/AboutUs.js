import React from "react";
import "../../input.css";
import "../../index.css";
import aboutUsBg from "../../assets/aboutUsBg.png";

const AboutUs = () => {
  return (
    <>
      <div
        className="bg-cover bg-center"
        style={{
          backgroundImage: `url(${aboutUsBg})`,
          height: "250px",
        }}
      ></div>
      <h2 className="text-3xl font-bold tracking-tight text-blue-800 sm:text-4xl pb-10 pt-10">
        About Us
      </h2>

      <div className="relative mb-3">
        <h6 className="mb-0">
          <button
            className="relative flex items-center w-full p-4 font-semibold text-left transition-all ease-in border-b border-solid cursor-pointer border-slate-100 text-slate-700 rounded-t-1 group text-dark-500"
            data-collapse-target="animated-collapse-1"
          >
            <span>What is Material Tailwind?</span>
            <i className="absolute right-0 pt-1 text-base transition-transform fa fa-chevron-down group-open:rotate-180"></i>
          </button>
        </h6>
        <div
          data-collapse="animated-collapse-1"
          className="h-0 overflow-hidden transition-all duration-300 ease-in-out"
        >
          <div className="p-4 text-sm leading-normal text-blue-gray-500/80">
            We're not always in the position that we want to be at. We're
            constantly growing. We're constantly making mistakes. We're
            constantly trying to express ourselves and actualize our dreams.
          </div>
        </div>
      </div>
      <div className="relative mb-3">
        <h6 className="mb-0">
          <button
            className="relative flex items-center w-full p-4 font-semibold text-left transition-all ease-in border-b border-solid cursor-pointer border-slate-100 text-slate-700 rounded-t-1 group text-dark-500"
            data-collapse-target="animated-collapse-2"
          >
            <span>How to use Material Tailwind?</span>
            <i className="absolute right-0 pt-1 text-base transition-transform fa fa-chevron-down group-open:rotate-180"></i>
          </button>
        </h6>
        <div
          data-collapse="animated-collapse-2"
          className="h-0 overflow-hidden transition-all duration-300 ease-in-out"
        >
          <div className="p-4 text-sm leading-normal text-blue-gray-500/80">
            We're not always in the position that we want to be at. We're
            constantly growing. We're constantly making mistakes. We're
            constantly trying to express ourselves and actualize our dreams.
          </div>
        </div>
      </div>
      <div className="relative mb-3">
        <h6 className="mb-0">
          <button
            className="relative flex items-center w-full p-4 font-semibold text-left transition-all ease-in border-b border-solid cursor-pointer border-slate-100 text-slate-700 rounded-t-1 group text-dark-500"
            data-collapse-target="animated-collapse-3"
          >
            <span>What can I do with Material Tailwind?</span>
            <i className="absolute right-0 pt-1 text-base transition-transform fa fa-chevron-down group-open:rotate-180"></i>
          </button>
        </h6>
        <div
          data-collapse="animated-collapse-3"
          className="h-0 overflow-hidden transition-all duration-300 ease-in-out"
        >
          <div className="p-4 text-sm leading-normal text-blue-gray-500/80">
            We're not always in the position that we want to be at. We're
            constantly growing. We're constantly making mistakes. We're
            constantly trying to express ourselves and actualize our dreams.
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
