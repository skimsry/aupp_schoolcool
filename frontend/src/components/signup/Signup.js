import React, { useState, useEffect } from "react";
import "../../input.css";
import "../../index.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Terms from "./Terms";

const Signup = () => {
  const apiUrl = process.env.REACT_APP_APIURL;
  const [showTerm, setshowTerm] = useState(false);
  const openTerms = () => setshowTerm(true);
  const closeTerms = () => setshowTerm(false);
  const [gpassword, setGpassword] = useState("");

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    type: "",
    email: "",
    password: "",
    rePassword: "",
    status: "",
    createdDate: "",
    updateDate: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [dtoc, setdtoc] = useState([]);
  const getToc = async () => {
    try {
      const response = await axios.get(`${apiUrl}api/toc/getToc`);

      setdtoc(response.data);
    } catch (error) {}
  };
  useEffect(() => {
    getToc();
  }, []);
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
      phoneNumber: formData.phoneNumber,
      type: formData.type,
      email: formData.email,
      password: password,
      rePassword: password,
      status: false,
      createdDate: new Date(),
      updateDate: new Date(),
    });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    const checkStrongPassword = checkPasswordStrength(formData.password);
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
          setLoading(true);

          const userData = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            phoneNumber: formData.phoneNumber,
            type: formData.type,
            email: formData.email,
            password: formData.password,
            status: false,
            createdDate: new Date(),
            updateDate: new Date(),
          };

          const response = await axios.post(
            // `${process.env.PATH_URL_CONNECT}api/users/register`,
            // userData
            `${apiUrl}api/users/register`,
            userData
          );
          toast.success(
            "User registered and is waiting approve from Administrator. Please check your email.",
            {
              position: "bottom-right",
              autoClose: 4000,
            }
          );
          setLoading(false);
          setTimeout(() => {
            navigate("/login");
          }, 4000);
        } catch (error) {
          setLoading(false);
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
  };

  return (
    <section
      className="text-left bg-gray-50 dark:bg-gray-900"
      style={{ paddingTop: "160px", paddingBottom: "100px" }}
    >
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create an account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
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
                    <option value="">Select type...</option>
                    {/* <option value="1">Administrator</option> */}
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
                  Password <span className="text-red-500">* </span>
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

              <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                Password requirements:
              </h2>
              <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
                <li>At least 8 characters </li>
                <li>At least one lowercase character</li>
                <li>Inclusion of at least one special character "! @ # ?"</li>
              </ul>

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    required
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="terms"
                    className="font-light text-gray-500 dark:text-gray-300"
                  >
                    <span className="text-red-500">*</span> I accept the{" "}
                    <a
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                      href="#"
                      onClick={openTerms}
                    >
                      Terms and Conditions{" "}
                    </a>
                  </label>
                </div>

                <Terms show={showTerm} onClose={closeTerms}>
                  {dtoc.map((dtoc, index) => (
                    <p key={dtoc._id}>{dtoc.text}</p>
                  ))}
                  {/* <p>
                    A Terms and Conditions agreement acts as a legal contract
                    between you (the company) and the user. It's where you
                    maintain your rights to exclude users from your app in the
                    event that they abuse your website/app, set out the rules
                    for using your service and note other important details and
                    disclaimers.
                  </p>
                  <p>
                    Having a Terms and Conditions agreement is completely
                    optional. No laws require you to have one. Not even the
                    super-strict and wide-reaching General Data Protection
                    Regulation (GDPR).
                  </p> */}
                </Terms>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                {loading && <div className="loader"></div>}
                Create an account
              </button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default Signup;
