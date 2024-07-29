import React, { useEffect, useContext, useState } from "react";
import "../../input.css";
import "../../index.css";
import Map from "../home/Map";
import contactBg from "../../assets/contactBg.png";
import { UserContext } from "../../ctx/UserContextProvider";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
const apiUrl = process.env.REACT_APP_APIURL;
const Contact = () => {
  const { showContact, setShowContact, getContact } = useContext(UserContext);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    subject: "",
    message: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleReset = () => {
    setFormData({
      fullname: "",
      email: "",
      subject: "",
      message: "",
    });
  };
  useEffect(() => {
    getContact();
  }, [apiUrl]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.fullname ||
      !formData.email ||
      !formData.subject ||
      !formData.message
    ) {
      toast.error("Field (*) cannot empty. Please check again!", {
        position: "bottom-right",
        autoClose: 3000,
      });
    } else {
      try {
        const contactData = {
          fullname: formData.fullname,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          createdDate: new Date(),
          updateDate: new Date(),
        };

        const response = await axios.post(
          `${apiUrl}api/secondcontact/register`,
          contactData
        );
        toast.success("Your message was sent.", {
          position: "bottom-right",
          autoClose: 1000,
        });
        handleReset();
      } catch (error) {
        toast.error("Cannot send your message.Please try again.", {
          position: "bottom-right",
          autoClose: 2000,
        });
      }
    }
  };

  return (
    <>
      <div
        className="bg-cover bg-center"
        style={{
          backgroundImage: `url(${contactBg})`,
          height: "250px",
        }}
      >
        <div className="text-white space-y-2 text-center pt-20">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {" "}
            Contact Us
          </h2>
          {showContact.map((contacts) => (
            <p
              className="font-serif text-sm dark:text-gray-600"
              key={contacts._id}
            >
              {contacts.covertitle}
            </p>
          ))}
        </div>
      </div>

      <div className="flex">
        <div className="w-1/2">
          <div className="text-left flex items-center justify-center p-12">
            <div className="mx-auto w-full max-w-[550px]">
              {showContact.map((contacts) => (
                <div class="bg-white overflow-hidden shadow rounded-lg border">
                  <div class="px-4 py-5 sm:px-6">
                    <h3 class="text-lg leading-6 font-medium text-gray-900">
                      {contacts.title}
                    </h3>
                    <p class="mt-1 max-w-2xl text-sm text-gray-500">
                      {contacts.subtitle}
                    </p>
                  </div>
                  <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
                    <dl class="sm:divide-y sm:divide-gray-200">
                      <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt class="text-sm font-medium text-gray-500">
                          Full name
                        </dt>
                        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {contacts.fullname}
                        </dd>
                      </div>
                      <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt class="text-sm font-medium text-gray-500">
                          Email address
                        </dt>
                        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {contacts.email}
                        </dd>
                      </div>
                      <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt class="text-sm font-medium text-gray-500">
                          Phone number
                        </dt>
                        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {contacts.phone}
                        </dd>
                      </div>
                      <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt class="text-sm font-medium text-gray-500">
                          Address
                        </dt>
                        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {contacts.address}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-1/2">
          <div className=" bg-slate-100 text-left flex items-center justify-center p-12">
            <div className="mx-auto w-full max-w-[550px]">
              <div className="mb-5">
                <label
                  for="name"
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="fullname"
                  id="name"
                  value={formData.fullname}
                  onChange={handleChange}
                  placeholder="Full Name"
                  required
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
              <div className="mb-5">
                <label
                  for="email"
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@domain.com"
                  required
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
              <div className="mb-5">
                <label
                  for="subject"
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Subject <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="subject"
                  id="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Enter your subject"
                  required
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
              <div className="mb-5">
                <label
                  for="message"
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows="4"
                  name="message"
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Type your message"
                  required
                  className="w-full resize-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                ></textarea>
              </div>
              <div>
                <button
                  type="button"
                  onClick={handleReset}
                  className="bg-sky-500 hover:bg-sky-300 rounded-md bg-blue py-3 px-8 text-base font-semibold text-white outline-none mr-2"
                >
                  Reset
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="hover:bg-blue-400 rounded-md bg-blue-600 py-3 px-8 text-base font-semibold text-white outline-none"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>

      <Map />
    </>
  );
};

export default Contact;
