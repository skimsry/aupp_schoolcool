import React, { useState, useEffect, useContext, useRef } from "react";
import Slidebar from "../partial/Slidebar";
import Main from "../partial/Main";
import "../../../input.css";
import "../../../index.css";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import FormattedDate from "../FormattedDate";
import DeleteConfirm from "../userManagement/DeleteConfirm";
import { UserContext } from "../../../ctx/UserContextProvider";
// import Fos from "./Fos";

const Profile = () => {
  // const { user, setUser, updateUser } = useContext(UserContext);
  const { user, updateUser } = useContext(UserContext);
  //const { userId } = useParams();

  const navigate = useNavigate();
  const dateInputRef = useRef(null);
  const [users, setUsers] = useState([]);
  const [userById, setUserById] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [gpassword, setGpassword] = useState("");
  const path = useLocation();
  const path_dashboard = path.pathname.startsWith("/")
    ? path.pathname.slice(9)
    : path.pathname;
  //   console.log(path_dashboard);
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
  const apiUrl = process.env.REACT_APP_APIURL;
  const generatePassword = () => {
    let charset = "";
    charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    charset += "abcdefghijklmnopqrstuvwxyz";
    charset += "0123456789";
    charset += "!@#$%^&*";

    let password = "";
    for (let i = 0; i < 8; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setGpassword(password);
    setFormData({
      firstName: formData.firstName,
      lastName: formData.lastName,
      gender: formData.gender,
      dob: formData.dob,
      phoneNumber: formData.phoneNumber,
      password: password,
      updateDate: new Date(),
    });
  };
  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
    setIsChecked(e.target.checked);
  };
  const checkPasswordStrength = (password) => {
    let strength = "";
    if (password.length >= 8) {
      if (
        /[A-Z]/.test(password) &&
        /[a-z]/.test(password) &&
        /[0-9]/.test(password) &&
        /[^A-Za-z0-9]/.test(password)
      ) {
        strength = "strong";
      } else if (
        /[A-Z]/.test(password) ||
        /[a-z]/.test(password) ||
        /[0-9]/.test(password)
      ) {
        strength = "medium";
      } else {
        strength = "weak";
      }
    } else {
      strength = "weak";
    }
    return strength;
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

      return response.data;
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };
  const getUserById = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}api/users/getUsersById/${user._id}`
      );
      setUserById(response.data);
      // console.log(response.data.status);
      //setLoading(true);
      //console.log(response.data);
      //return response.data;
      setFormData({
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        gender: response.data.gender,
        dob: response.data.dob,
        fos: response.data.fos,
        phoneNumber: response.data.phoneNumber,
        type: response.data.type,
        email: response.data.email,
        // password: "123!@#thawat",
        // rePassword: "123!@#thawat",
        status: response.data.status,
        createdDate: response.data.createdDate,
        updateDate: response.data.updateDate,
      });
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  //   const handleUpdate = async () => {
  //     setLoading(true);
  //     if (
  //       !formData.firstName ||
  //       !formData.lastName ||
  //       !formData.gender ||
  //       !formData.phoneNumber
  //     ) {
  //       toast.error("Field (*) cannot empty. Please check again!", {
  //         position: "bottom-right",
  //         autoClose: 3000,
  //       });
  //       setLoading(false);
  //     } else {
  //       const checkStrongPassword = checkPasswordStrength(formData.password);
  //       if (checkStrongPassword === "weak") {
  //         toast.error("Your password is not strong enough. Please try again!", {
  //           position: "bottom-right",
  //           autoClose: 2000,
  //         });
  //         setLoading(false);
  //       } else {

  //         try {
  //           const updatedUserData = {
  //             firstName: formData.firstName,
  //             lastName: formData.lastName,
  //             gender: formData.gender,
  //             dob: formData.dob,
  //             phoneNumber: formData.phoneNumber,
  //             password: formData.password,
  //             updateDate: new Date(),
  //           };

  //           console.log(`Hello ${JSON.stringify(updatedUserData)}`);
  //           const response = await axios.put(
  //             `${apiUrl}api/users/updateFull/${path_dashboard}`,
  //             JSON.stringify(updatedUserData)
  //           );
  //           toast.success("Updated Profile successfully.", {
  //             position: "bottom-right",
  //             autoClose: 1000,
  //           });
  //         } catch (error) {
  //           setLoading(false);
  //           toast.error("Cannot update this Profile. Please try again.", {
  //             position: "bottom-right",
  //             autoClose: 2000,
  //           });
  //         } finally {
  //           setLoading(false);
  //         }
  //       }
  //     }
  //   };
  const handleUpdate = async () => {
    setLoading(true);

    // Check for empty required fields
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.gender ||
      !formData.phoneNumber
    ) {
      toast.error("Field (*) cannot be empty. Please check again!", {
        position: "bottom-right",
        autoClose: 3000,
      });
      setLoading(false);
      return; // Exit early if validation fails
    }
    if (formData.password) {
      // Check password strength
      const passwordStrength = checkPasswordStrength(formData.password);
      if (passwordStrength === "weak") {
        toast.error("Your password is not strong enough. Please try again!", {
          position: "bottom-right",
          autoClose: 2000,
        });
        setLoading(false);
        return; // Exit early if password is weak
      }
    }

    try {
      const updatedUserData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        gender: formData.gender,
        dob: formData.dob,
        phoneNumber: formData.phoneNumber,
        // password: formData.password,
        ...(formData.password && { password: formData.password }),
        updateDate: new Date(),
      };

      // Log the updated data for debugging
      //console.log(`Updating user data: ${JSON.stringify(updatedUserData)}`);

      // Perform the API request
      const response = await axios.put(
        `${apiUrl}api/users/updateFull/${path_dashboard}`,
        updatedUserData // No need to stringify here; axios will handle it
      );
      //console.log(response.data);
      updateUser(response.data.user, response.data.token);

      //setUser(updatedUserData);
      // Notify user of success
      toast.success("Profile updated successfully.", {
        position: "bottom-right",
        autoClose: 1000,
      });
    } catch (error) {
      // Handle any errors during the update
      toast.error("Cannot update the profile. Please try again.", {
        position: "bottom-right",
        autoClose: 2000,
      });
    } finally {
      setLoading(false); // Ensure loading state is reset
    }
  };

  useEffect(() => {
    getUserById();
    getUsers();
    //setMyId(_id);
    //console.log(myId);
    //console.log(user._id);
    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split("T")[0];
    if (dateInputRef.current) {
      dateInputRef.current.setAttribute("max", today);
    }
  }, [apiUrl]);

  return (
    <>
      <Slidebar />
      <Main />
      <div className="ml-72 mr-8 mt-4">
        <section className="text-left bg-gray-50 dark:bg-gray-900">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8 bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Update Profile
            </h1>

            {/* <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}> */}
            <div className="space-y-4 md:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-1">
                  <label
                    htmlFor="firstName"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    First Name <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="SORN"
                    required
                  />
                </div>
                <div className="col-span-1">
                  <label
                    htmlFor="lastName"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="KIMSRY"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="col-span-1">
                  <label
                    htmlFor="type"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Gender <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value="">Select gender...</option>
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                    <option value="O">Other</option>
                  </select>
                </div>
                <div className="col-span-1">
                  <label
                    htmlFor="lastName"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Date of Birth (Month / Day / Year)
                  </label>
                  <input
                    type="date"
                    name="dob"
                    id="dob"
                    ref={dateInputRef}
                    value={formData.dob ? formData.dob.split("T")[0] : ""}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>

                <div className="col-span-1">
                  <label
                    htmlFor="type"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Family of Student{" "}
                    <span className="text-red-500">
                      (Only Admin can change this)
                    </span>
                  </label>
                  <select
                    id="fos"
                    name="fos"
                    value={formData.fos}
                    onChange={handleChange}
                    disabled
                    className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value="">Select family of student</option>
                    {users.map((user, i) => (
                      <option value={user._id} key={user._id}>
                        {`${user.firstName} ${user.lastName} | DOB : `}
                        <FormattedDate date={user.dob} />
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  disabled
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-1">
                  <label
                    htmlFor="phoneNumber"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    id="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="016571913"
                    required
                  />
                </div>
                <div className="col-span-1">
                  <label
                    htmlFor="type"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Type{" "}
                    <span className="text-red-500">
                      (Only Admin can change this)
                    </span>
                  </label>
                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    disabled
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value="">Select type...</option>
                    <option value="1">Administrator</option>
                    <option value="2">Teacher</option>
                    <option value="3">Student</option>
                    <option value="4">Parent</option>
                  </select>
                </div>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password <span className="text-red-500">*</span>
                  {/* <span className="text-red-500">
                    {" ( "}
                    Default password will generate {' " '}123!@#thawat
                    {' " '}. Please change it!{" ) "}
                  </span> */}
                  <button
                    type="button"
                    onClick={generatePassword}
                    class="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Password Generate
                  </button>
                  <span class="text-red-600"> {gpassword} </span>
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              {/* {userId ? (
                ""
              ) : ( */}
              {/* <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Retype-Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  name="rePassword"
                  id="rePassword"
                  placeholder="••••••••"
                  value={formData.rePassword}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              )} */}
              {/* <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Active account?
                </label>

                <label className="inline-flex items-center cursor-pointer ">
                  <input
                    type="checkbox"
                    value={formData.status}
                    onChange={handleChange}
                    className="sr-only peer"
                    name="status"
                    checked={formData.status}
                  />
                  <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                    {isChecked ? "On" : "Off"}
                  </span>
                </label>
              </div> */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <DeleteConfirm
                  onDelete={() => handleUpdate()}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  ico="ri-edit-box-line"
                  text="Confirm to update this account ?"
                />
              </div>
              {/* </form> */}
            </div>
          </div>
          <ToastContainer />
        </section>
      </div>
    </>
  );
};

export default Profile;
