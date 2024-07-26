import React, { useState, useContext } from "react";
import "../../input.css";
import "../../index.css";
import axios from "axios";
import { redirect, useNavigate } from "react-router-dom";
import { UserContext } from "../../ctx/UserContextProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//axios.defaults.withCredentials = true;

const Login = () => {
  const { login } = useContext(UserContext);
  const apiUrl = process.env.REACT_APP_APIURL;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  // const [error, setError] = useState("");
  // const [loading, setLoading] = useState(false);

  //const handleChange = (e) => {
  //const { name, value, type, checked } = e.target;
  // const { name, value, type, checked } = e.target;
  // const newValue = type === "checkbox" ? checked : value;

  // setFormData({
  //   ...formData,
  // [name]: newValue,
  //   });
  // };
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // setLoading(true);
      const userData = {
        email: formData.email,
        password: formData.password,
      };

      // Make an HTTP POST request to your backend login endpoint
      const response = await axios.post(`${apiUrl}api/users/login`, userData);

      if (response.status === 200) {
        login(response.data.user, response.data.token);
        toast.success("Login successfully. !!!.", {
          position: "bottom-right",
          autoClose: 200,
          onClose: () => {
            navigate("/dashboard");
          },
        });
      }
    } catch (error) {
      // setLoading(false);
      if (error.response && error.response.status === 401) {
        //setError("Incorrect email or password.");
        toast.error("Incorrect email or password. !!!.", {
          position: "bottom-right",
          autoClose: 2000,
        });
      } else {
        //setError("Login failed. Please try again later.");
        toast.error("Login failed. Please try again later.", {
          position: "bottom-right",
          autoClose: 2000,
        });
      }
    }
  };

  return (
    <section className="text-left bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Log in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              {/* <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="text-gray-500 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Forgot password?
                </a>
              </div> */}
              <button
                type="submit"
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Log in
              </button>
              {/* {loading && <p>Loading...</p>}
              {error && <p className="text-red-500">{error}</p>} */}
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default Login;
