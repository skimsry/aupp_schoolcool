import React, { useContext, useEffect } from "react";
import "../../input.css";
import "../../index.css";
import aboutUsBg from "../../assets/aboutUsBg.png";
import Accordion from "./Accordion";
import OurTeam from "../home/OurTeam";
import { UserContext } from "../../ctx/UserContextProvider";
// const items = [
//   {
//     title: "History",
//     content:
//       "AUPP was established in 2013 as a Cambodian university (license) with an American curriculum. There were three founders who envisioned a new university that would meet international standards and be based on the US educational system. AUPP began operations in May 2013 in a temporary facility in Toul Kork. It was grounded on several principles: senior managers were to be highly qualified, experienced western administrators with administrative skills and experience in academic affairs; faculty must have terminal degrees from U.S.",
//   },
//   {
//     title: "Vision",
//     content:
//       "American University of Phnom Penh (AUPP) will be a leading center of academic excellence in Cambodia and in Asia.",
//   },
//   {
//     title: "Mission",
//     content:
//       "AUPP is a private English language higher-education institution in Cambodia, offering high-quality American-style education that is grounded in the culture of Cambodia and Asia. The university fosters socially responsible behavior, life-long learning, and academic and professional excellence, producing critical thinkers, innovators, and ethical leaders who will make significant contributions to the world.",
//   },
//   {
//     title: "Career Opportunities",
//     content:
//       "It is the mission of the human resources department to develop, implement and support processes that add value to AUPP and its employees, leading to improved employee welfare, empowerment, growth and retention, while remaining committed to AUPP’s key business drivers, its management and prosperity for its students, employees and community partners.",
//   },
//   {
//     title: "License and Accreditation",
//     content:
//       "American University of Phnom Penh (AUPP) was established in 2013 with a license by the then Prime Minister of Cambodia. AUPP operates as a private university under the Ministry of Education, Youth and Sport supervision. AUPP received full institutional accreditation from 2019. During the Accreditation Committee of Cambodia visit in August 2023, the officials were impressed with the AUPP progress. We are currently preparing for the national accreditation renewal.",
//   },
// ];

const AboutUs = () => {
  const { showAboutus, getAboutus } = useContext(UserContext);
  useEffect(() => {
    getAboutus();
    console.log(items);
  }, []);
  const items = [
    {
      title: "History",
      content: showAboutus.map((aboutus) => aboutus.historys).join(", "),
    },
    {
      title: "Vision",
      content: showAboutus.map((aboutus) => aboutus.vision).join(", "),
    },
    {
      title: "Mission",
      content: showAboutus.map((aboutus) => aboutus.mission).join(", "),
    },
    {
      title: "Career Opportunities",
      content: showAboutus.map((aboutus) => aboutus.career).join(", "),
    },
    {
      title: "License and Accreditation",
      content: showAboutus.map((aboutus) => aboutus.license).join(", "),
    },
  ];
  return (
    <>
      <div
        className="bg-cover bg-center"
        style={{
          backgroundImage: `url(${aboutUsBg})`,
          height: "250px",
        }}
      >
        <div className="text-white space-y-2 text-center pt-20">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {" "}
            About Us
          </h2>
          {showAboutus.map((aboutus) => (
            <p
              className="font-serif text-sm dark:text-gray-600"
              key={aboutus._id}
            >
              {aboutus.text}
            </p>
          ))}
          {/* Qualisque erroribus usu at, duo te agam soluta mucius. */}
        </div>
      </div>
      <div className="App p-4">
        {/* <h1 className="text-4xl font-bold mb-4 text-blue-800">About Us</h1> */}
        <Accordion items={items} />
      </div>
      <OurTeam />
    </>
  );
};

export default AboutUs;
