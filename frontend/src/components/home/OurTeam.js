import React, { useEffect, useState } from "react";
// import "../../index.css";
// import "../../input.css";
import teamIcon from "../../assets/team.avif";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const apiUrl = process.env.REACT_APP_APIURL;

const OurTeam = () => {
  const [mteams, setMteams] = useState([]);
  const [teams, setTeams] = useState([]);
  const getMteams = async () => {
    try {
      const response = await axios.get(`${apiUrl}api/mteam/getMteam`);
      setMteams(response.data);
    } catch (error) {
      console.error("Failed to fetch map data.", error);
    }
  };
  const getTeams = async () => {
    try {
      const response = await axios.get(`${apiUrl}api/team/getTeam`);
      setTeams(response.data);
    } catch (error) {
      console.error("Failed to fetch map data.", error);
    }
  };
  useEffect(() => {
    getMteams();
    getTeams();
  }, []);
  return (
    <div className="bg-slate-100 py-12 sm:py-16">
      <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
        <div className="max-w-2xl">
          <hr className="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700" />
          <h2 className="text-3xl font-bold tracking-tight text-blue-800 sm:text-4xl">
            Our team
          </h2>
          {mteams.map((item) => (
            <p
              className="mt-6 text-lg leading-8 text-gray-600 text-justify indent-5"
              key={item._id}
            >
              {item.text}
            </p>
          ))}
        </div>
        <ul
          role="list"
          className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2"
        >
          {teams.map((member, index) => (
            <li key={index}>
              <div className="flex items-center gap-x-6 text-left">
                <img
                  className="h-16 w-16 rounded-full"
                  src={member.profileimg}
                  alt={member.name}
                />
                <div>
                  <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">
                    {member.name}
                  </h3>
                  <p className="text-sm font-semibold leading-6 text-indigo-600">
                    {member.position}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// Mock data for team members
// const teamMembers = [
//   {
//     name: "Leslie Alexander",
//     position: "Co-Founder / CEO",
//     image: teamIcon,
//   },
//   {
//     name: "Leslie Alexander",
//     position: "Co-Founder / CEO",
//     image: teamIcon,
//   },
//   {
//     name: "Leslie Alexander",
//     position: "Co-Founder / CEO",
//     image: teamIcon,
//   },
//   {
//     name: "Leslie Alexander",
//     position: "Co-Founder / CEO",
//     image: teamIcon,
//   },
//   {
//     name: "Leslie Alexander",
//     position: "Co-Founder / CEO",
//     image: teamIcon,
//   },
//   {
//     name: "Leslie Alexander",
//     position: "Co-Founder / CEO",
//     image: teamIcon,
//   },
// ];

export default OurTeam;
