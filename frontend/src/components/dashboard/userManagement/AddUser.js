import React, { useState, useEffect, useContext, useRef } from "react";
import Slidebar from "../partial/Slidebar";
import Main from "../partial/Main";
import "../../../input.css";
import "../../../index.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import FormattedDate from "../FormattedDate";
import DeleteConfirm from "./DeleteConfirm";
import { UserContext } from "../../../ctx/UserContextProvider";

// import Fos from "./Fos";

function AddUser() {
  const {
    userStudent,
    setUserStudent,
    logout,
    user,
    updateUser,
    getUserStudent,
  } = useContext(UserContext);
  //console.log(userStudent._id);
  const { userId } = useParams();
  const navigate = useNavigate();
  const dateInputRef = useRef(null);
  const [users, setUsers] = useState([]);
  const [userById, setUserById] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [alert, setAlert] = useState(false);
  const [pass, setPass] = useState("");
  const [email, setEmail] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const apiUrl = process.env.REACT_APP_APIURL;
  const [userStudent2, setUserStudent2] = useState([]);
  const [gpassword, setGpassword] = useState("");
  const [gpassword2, setGpassword2] = useState("");
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
    // status: "",
    status: false,
    createdDate: "",
    updateDate: "",
  });
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
      fos: formData.fos,
      phoneNumber: formData.phoneNumber,
      type: formData.type,
      email: formData.email,
      password: password,
      rePassword: password,
      status: formData.status,
      createdDate: new Date(),
      updateDate: new Date(),
    });
  };
  const handleReset = () => {
    setFormData({
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
      status: false,
      createdDate: "",
      updateDate: "",
    });
    setGpassword("");
    setEmail("");
  };

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prevFormData) => ({
  //     ...prevFormData,
  //     [name]: value,
  //   }));
  // };
  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
      // [name]: checked,
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
  const getUserStudent2 = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${apiUrl}api/users/getUsersStudent`);

      setUserStudent2(response.data);
    } catch (error) {
      setError(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  // const checkFieldEmpty = () => {
  //   if (!formData.firstName) {
  //     toast.error("Cannot empty First Name!", {
  //       position: "bottom-right",
  //       autoClose: 2000,
  //     });
  //   }
  //   if (!formData.lastName) {
  //     toast.error("Cannot empty Last Name!", {
  //       position: "bottom-right",
  //       autoClose: 2000,
  //     });
  //   }
  //   if (!formData.gender) {
  //     toast.error("Cannot empty Gender!", {
  //       position: "bottom-right",
  //       autoClose: 2000,
  //     });
  //   }
  //   if (!formData.email) {
  //     toast.error("Cannot empty Your email!", {
  //       position: "bottom-right",
  //       autoClose: 2000,
  //     });
  //   }
  //   if (!formData.phoneNumber) {
  //     toast.error("Cannot empty Your Phone Number!", {
  //       position: "bottom-right",
  //       autoClose: 2000,
  //     });
  //   }
  // };
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   // checkFieldEmpty();
  //   const checkStrongPassword = checkPasswordStrength(formData.password);
  //   if (
  //     !formData.firstName ||
  //     !formData.lastName ||
  //     !formData.gender ||
  //     !formData.email ||
  //     !formData.phoneNumber
  //   ) {
  //     toast.error("Field (*) cannot empty. Please check again!", {
  //       position: "bottom-right",
  //       autoClose: 3000,
  //     });
  //   } else {
  //     if (checkStrongPassword === "weak") {
  //       toast.error("Your password is not strong enough. Please try again!", {
  //         position: "bottom-right",
  //         autoClose: 2000,
  //       });
  //     } else {
  //       if (formData.password !== formData.rePassword) {
  //         toast.error("Please type Retype-Password again !!!.", {
  //           position: "bottom-right",
  //           autoClose: 2000,
  //         });
  //       } else {
  //         try {
  //           const userData = {
  //             firstName: formData.firstName,
  //             lastName: formData.lastName,
  //             gender: formData.gender,
  //             dob: formData.dob,
  //             fos: formData.fos,
  //             phoneNumber: formData.phoneNumber,
  //             type: formData.type,
  //             email: formData.email,
  //             password: formData.password,
  //             status: formData.status,
  //             createdDate: new Date(),
  //             updateDate: new Date(),
  //           };

  //           const response = await axios.post(
  //             `${apiUrl}api/users/register`,
  //             userData
  //           );
  //           toast.success("User registered is Successfully!!!.", {
  //             position: "bottom-right",
  //             autoClose: 1000,
  //           });
  //           handleReset();
  //           // getUserStudent();
  //           getUserStudent2();
  //         } catch (error) {
  //           toast.error(
  //             "This email is already in use. Please try another email.",
  //             {
  //               position: "bottom-right",
  //               autoClose: 2000,
  //             }
  //           );
  //         }
  //       }
  //     }
  //   }
  // };

  //export this function to userContext by add export
  // const getUsers = async () => {
  //   try {
  //     // const response = await axios.get();

  //     const response = await axios.get(
  //       `${apiUrl}api/users/getUsersStudent`
  //       // `http://localhost:3001api/users/getUsers`
  //     );
  //     //console.log(response.data);
  //     setUsers(response.data);
  //     setLoading(true);

  //     return response.data;
  //   } catch (error) {
  //     setError(error);
  //     setLoading(false);
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // checkFieldEmpty();
    const checkStrongPassword = checkPasswordStrength(formData.password);
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.gender ||
      !formData.email ||
      !formData.phoneNumber
    ) {
      toast.error("Field (*) cannot empty. Please check again!", {
        position: "bottom-right",
        autoClose: 3000,
      });
    } else {
      if (checkStrongPassword === "weak") {
        toast.error("Your password is not strong enough. Please try again!", {
          position: "bottom-right",
          autoClose: 2000,
        });
      } else {
        if (formData.password !== formData.rePassword) {
          toast.error("Please type Retype-Password again !!!.", {
            position: "bottom-right",
            autoClose: 2000,
          });
        } else {
          try {
            const userData = {
              firstName: formData.firstName,
              lastName: formData.lastName,
              gender: formData.gender,
              dob: formData.dob,
              fos: formData.fos,
              phoneNumber: formData.phoneNumber,
              type: formData.type,
              email: formData.email,
              password: formData.password,
              status: formData.status,
              createdDate: new Date(),
              updateDate: new Date(),
            };

            const response = await axios.post(
              `${apiUrl}api/users/register`,
              userData
            );
            toast.success("User registered is Successfully!!!.", {
              position: "bottom-right",
              autoClose: 1000,
            });
            handleReset();
            // getUserStudent();
            setEmail(formData.email);
            setGpassword2(formData.password);
            setAlert(true);
            getUserStudent2();
          } catch (error) {
            toast.error(
              "This email is already in use. Please try another email.",
              {
                position: "bottom-right",
                autoClose: 2000,
              }
            );
          }
        }
      }
    }
  };

  const getUserById = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}api/users/getUsersById/${userId}`
      );
      setUserById(response.data);

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
  const handleDelete = async () => {
    //e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${apiUrl}api/users/delete/${userId}`);
      // setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
      toast.success("User deleted successfully.", {
        position: "bottom-right",
        autoClose: 1000,
      });
      setTimeout(() => {
        // navigate("/manageUsers");
        if (userId !== user._id) {
          navigate("/manageUsers");
        } else {
          logout();
        }
      }, 1000);
    } catch (error) {
      setLoading(false);
      toast.error("Cannot delete. Please try another.", {
        position: "bottom-right",
        autoClose: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    // checkFieldEmpty();
    setLoading(true);
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.gender ||
      !formData.email ||
      !formData.phoneNumber
    ) {
      toast.error("Field (*) cannot empty. Please check again!", {
        position: "bottom-right",
        autoClose: 3000,
      });
    } else {
      if (formData.password) {
        const checkStrongPassword = checkPasswordStrength(formData.password);
        if (checkStrongPassword === "weak") {
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
          fos: formData.fos,
          phoneNumber: formData.phoneNumber,
          // password: formData.password,
          ...(formData.password && { password: formData.password }),
          type: formData.type,
          status: formData.status,
          updateDate: new Date(),
        };

        const response = await axios.put(
          `${apiUrl}api/users/updateFull/${userId}`, // userId should be passed here
          updatedUserData
        );
        toast.success("Updated successfully.", {
          position: "bottom-right",
          autoClose: 1000,
        });
        setTimeout(() => {
          if (userId === user._id) {
            updateUser(response.data.user, response.data.token);
            logout();
          }
          navigate("/manageUsers");
        }, 1000);
      } catch (error) {
        setLoading(false);
        toast.error("Cannot update this account. Please try again.", {
          position: "bottom-right",
          autoClose: 2000,
        });
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (userId) {
      getUserById();
    } else {
      handleReset();
    }
    //getUsers();
    // generatePassword();
    // console.log(gpassword);
    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split("T")[0];
    if (dateInputRef.current) {
      dateInputRef.current.setAttribute("max", today);
    }
    //if (userStudent) {
    // getUserStudent();
    // console.log(userStudent);

    getUserStudent2();
    // setFormData({
    //   status: false,
    // });
    setFormData({
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
      status: false,
      createdDate: "",
      updateDate: "",
    });
    //}
  }, [apiUrl, userId]);

  return (
    <>
      <Slidebar />
      <Main />
      <div className="ml-72 mr-8 mt-4">
        <section className="text-left bg-gray-50 dark:bg-gray-900">
          {alert ? (
            <div
              className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
              role="alert"
            >
              <span className="font-medium">Success create!</span> Default
              password is <span className="text-red-600"> {gpassword2} </span>{" "}
              of email <span className="text-red-600"> {email} </span>. Please
              update password after login.
            </div>
          ) : (
            <div></div>
          )}

          <div className="p-6 space-y-4 md:space-y-6 sm:p-8 bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              {userId ? "Update user" : "Create an new user"}
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

                {/* <div className="col-span-1">
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
                    <option value="">Select Student</option>
                    
                    {users.map((user, i) => (
                      <option value={user._id} className="">
                        {`${user.firstName} ${user.lastName} | DOB : `}
                        <FormattedDate date={user.dob} />
                      </option>
                    ))}
                  </select>
                </div> */}
                {/* <Fos /> */}
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
                    {/* {userStudent.map((user, i) => (
                      <option value={user._id} key={user._id}>
                        {`${user.firstName} ${user.lastName} | DOB : `}
                        <FormattedDate date={user.dob} />
                      </option>
                    ))} */}
                    {userStudent2.map((user, i) => (
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
                  {userId ? (
                    <span className="text-red-500">
                      {" ( "}
                      Cannot change this email.
                      {" ) "}
                    </span>
                  ) : (
                    ""
                  )}
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  disabled={!!userId}
                  required
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
                    type="number"
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
                    Type
                  </label>
                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    {!formData.fos ? (
                      <>
                        <option value="">Select type...</option>
                        <option value="1">Administrator</option>
                        <option value="2">Teacher</option>
                        <option value="3">Student</option>
                      </>
                    ) : (
                      <option value="4">Parent</option>
                    )}
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password <span className="text-red-500">* </span>
                  <button
                    type="button"
                    onClick={generatePassword}
                    class="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Password Generate
                  </button>
                  {/* {userId ? (
                    <span className="text-red-500">
                      {" ( "}
                      Default password will generate {' " '}123!@#thawat
                      {' " '}. Please change it!{" ) "}
                    </span>
                  ) : (
                    ""
                  )} */}
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
              {userId ? (
                ""
              ) : (
                <div>
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
              )}
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Active account?
                </label>

                <label className="inline-flex items-center cursor-pointer ">
                  {/* <input
                    type="checkbox"
                    // value={userId ? formData.status : false}
                    value={formData.status}
                    onChange={handleChange}
                    className="sr-only peer"
                    name="status"
                    // checked={userId ? formData.status : false}
                    checked={formData.status}
                  /> */}
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
              </div>
              <div
                className={`grid grid-cols-1 ${
                  userId ? "md:grid-cols-8" : "md:grid-cols-9"
                } gap-4`}
              >
                {userId ? (
                  // <div className="col-span-1 flex justify-center items-center">
                  //   <button
                  //     type="button"
                  //     className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                  //   >
                  //     Delete
                  //   </button>
                  // </div>

                  <DeleteConfirm
                    onDelete={() => handleDelete()}
                    className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                    ico="ri-delete-bin-line text-lg"
                    text="Are you sure you want to delete?"
                    labelButton=" Delete"
                  />
                ) : (
                  <div className="col-span-1 flex justify-center items-center">
                    <button
                      type="button"
                      onClick={handleReset}
                      className="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
                    >
                      <i class="ri-brush-3-line text-lg"></i> Clear
                    </button>
                  </div>
                )}
                {userId ? (
                  // <div className="col-span-1 flex justify-center items-center">
                  //   <button
                  //     type="button"
                  //     onClick={handleReset}
                  //     className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  //   >
                  //     Update
                  //   </button>
                  // </div>
                  <DeleteConfirm
                    onDelete={() => handleUpdate()}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    ico="ri-edit-box-line text-lg"
                    text="Confirm to update this account ?"
                    labelButton=" Update"
                  />
                ) : (
                  <div className="col-span-1 flex justify-center items-center">
                    <button
                      type="button"
                      onClick={handleSubmit}
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                      <i class="ri-save-3-line text-lg"></i> Create
                    </button>
                  </div>
                )}
              </div>
              {/* </form> */}
            </div>
          </div>
          <ToastContainer />
        </section>
      </div>
    </>
  );
}

export default AddUser;
