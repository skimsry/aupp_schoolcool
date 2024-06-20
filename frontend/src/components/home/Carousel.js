import React, { useState, useEffect } from "react";
import "../../input.css";
import "../../index.css";
import { ChevronLeft, ChevronRight } from "react-feather";
const slides = [
  {
    src: "https://www.aupp.edu.kh/wp-content/uploads/Welcome-Back.jpg",
    caption: "First Slide",
    description: "This is the first slide",
  },
  {
    src: "https://www.aupp.edu.kh/wp-content/uploads/Welcome-Back.jpg",
    caption: "Second Slide",
    description: "This is the second slide",
  },
  {
    src: "https://www.aupp.edu.kh/wp-content/uploads/Welcome-Back.jpg",
    caption: "Third Slide",
    description: "This is the third slide",
  },
  {
    src: "https://www.aupp.edu.kh/wp-content/uploads/Welcome-Back.jpg",
    caption: "Fourth Slide",
    description: "This is the fourth slide",
  },
];
const Carousel = ({ autoSlide = true, autoSlideInterval = 10000 }) => {
  const [curr, setCurr] = useState(0);

  const prev = () =>
    setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1));
  const next = () =>
    setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1));

  useEffect(() => {
    if (!autoSlide) return;
    const slideInterval = setInterval(next, autoSlideInterval);
    return () => clearInterval(slideInterval);
  }, [autoSlide, autoSlideInterval]);
  return (
    <div className="overflow-hidden relative">
      <div
        className="flex transition-transform ease-out duration-500"
        style={{ transform: `translateX(-${curr * 100}%)` }}
      >
        {slides.map((image, index) => (
          <>
            <img
              src={image.src}
              id={index}
              style={{ width: "1900px", height: "860px" }}
              alt={image.caption}
            />
            {/* <h1>{image.caption}</h1>
            <p>{image.description}</p> */}
          </>
        ))}
      </div>
      <div className="absolute inset-0 flex items-center justify-between p-4">
        <button
          onClick={prev}
          className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white"
        >
          <ChevronLeft size={40} />
        </button>
        <button
          onClick={next}
          className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white"
        >
          <ChevronRight size={40} />
        </button>
      </div>

      <div className="absolute bottom-4 right-0 left-0">
        <div className="flex items-center justify-center gap-2">
          {slides.map((_, i) => (
            <div
              className={`
              transition-all w-3 h-3 bg-white rounded-full
              ${curr === i ? "p-2" : "bg-opacity-50"}
            `}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default Carousel;
