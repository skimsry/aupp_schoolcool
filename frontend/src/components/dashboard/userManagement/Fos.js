import React, { useState, useEffect, useContext } from "react";
import FormattedDate from "../FormattedDate";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

function Fos() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiUrl = process.env.REACT_APP_APIURL;
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    dob: "",
    fos: "",
    phoneNumber: "",
    type: "",
    email: "",
    password: "",
    rePassword: "",
    status: "",
    createdDate: "",
    updateDate: "",
  });
  // const handleChange = (e) => {
  //   const { name, value } = e.target;

  //   setFormData({
  //     ...formData,
  //     [name]: value,
  //   });
  // };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const getUsers = async () => {
    try {
      // const response = await axios.get();

      const response = await axios.get(
        `${apiUrl}api/users/getUsersStudent`
        // `http://localhost:3001api/users/getUsers`
      );
      //console.log(response.data);
      setUsers(response.data);
      setLoading(true);

      //return response.data;
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    getUsers();
  }, [apiUrl]);
  return (
    <div className="col-span-1">
      <label
        htmlFor="type"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Family of Student
      </label>
      <select
        id="fos"
        name="fos"
        value={formData.fos}
        onChange={handleChange}
        className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option value="">Select family of student</option>

        {/* {users.map((user, i) => (
          <option value={user._id} className="" key={user._id}>
            {`${user.firstName} ${user.lastName} | DOB : `}
            <FormattedDate date={user.dob} />
          </option>
        ))} */}
        {users.map((user, i) => (
          <option value={user._id} key={user._id}>
            {`${user.firstName} ${user.lastName} | DOB : `}
            <FormattedDate date={user.dob} />
          </option>
        ))}
      </select>
    </div>
  );
}

export default Fos;
