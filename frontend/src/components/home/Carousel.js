import React, { useEffect, useState } from "react";
import axios from "axios";
import { ChevronLeft, ChevronRight } from "react-feather";
import TextCarousel from "./TextCarousel";
const apiUrl = process.env.REACT_APP_APIURL;
// import slideshow from "../../assets/Welcome-Back.jpg";
// const slides = [
//   {
//     src: slideshow,
//     caption: "First Slide",
//     description: "This is the first slide",
//   },
//   {
//     src: slideshow,
//     caption: "Second Slide",
//     description: "This is the second slide",
//   },
//   {
//     src: slideshow,
//     caption: "Third Slide",
//     description: "This is the third slide",
//   },
//   {
//     src: slideshow,
//     caption: "Fourth Slide",
//     description: "This is the fourth slide",
//   },
// ];
const Carousel = ({ autoSlide = true, autoSlideInterval = 10000 }) => {
  const [curr, setCurr] = useState(0);
  const [imgslideshow, setImgslideshow] = useState([]);
  const getImgslideshow = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}api/imgslideshow/getImgslideshow`
      );
      setImgslideshow(response.data);
    } catch (error) {
      console.error("Failed to fetch map data.", error);
    }
  };
  const prev = () =>
    setCurr((curr) => (curr === 0 ? imgslideshow.length - 1 : curr - 1));
  const next = () =>
    setCurr((curr) => (curr === imgslideshow.length - 1 ? 0 : curr + 1));

  useEffect(() => {
    getImgslideshow();
    if (!autoSlide) return;
    const slideInterval = setInterval(next, autoSlideInterval);
    return () => clearInterval(slideInterval);
  }, [autoSlide, autoSlideInterval, apiUrl, getImgslideshow]);
  return (
    <div className="overflow-hidden relative">
      <div
        className="flex transition-transform ease-out duration-500"
        style={{ transform: `translateX(-${curr * 100}%)` }}
      >
        {imgslideshow.map((image, index) => (
          <img
            src={image.imgslideshow}
            key={index}
            alt={image.caption}
            className="max-w-full h-auto"
          />
        ))}
      </div>
      <TextCarousel />
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
          {imgslideshow.map((_, i) => (
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
