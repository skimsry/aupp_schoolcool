import React from "react";
import "../../input.css";
import "../../index.css";
import Map from "../home/Map";
import contactBg from "../../assets/contactBg.png";

const Contact = () => {
  return (
    <>
      <div
        className="bg-cover bg-center"
        style={{
          backgroundImage: `url(${contactBg})`,
          height: "250px",
        }}
      ></div>
      <h2 className="text-3xl font-bold tracking-tight text-blue-800 sm:text-4xl pb-10 pt-10">
        Contact Us
      </h2>
      <div className="flex">
        <div className="w-1/2">
          <div className="text-left flex items-center justify-center p-12">
            <div className="mx-auto w-full max-w-[550px]">
              <div class="bg-white overflow-hidden shadow rounded-lg border">
                <div class="px-4 py-5 sm:px-6">
                  <h3 class="text-lg leading-6 font-medium text-gray-900">
                    Fast Contact Here
                  </h3>
                  <p class="mt-1 max-w-2xl text-sm text-gray-500">
                    This is some information about this administrator.
                  </p>
                </div>
                <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
                  <dl class="sm:divide-y sm:divide-gray-200">
                    <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt class="text-sm font-medium text-gray-500">
                        Full name
                      </dt>
                      <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        SORN KIMSRY
                      </dd>
                    </div>
                    <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt class="text-sm font-medium text-gray-500">
                        Email address
                      </dt>
                      <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        sornkimsry@yahoo.com
                      </dd>
                    </div>
                    <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt class="text-sm font-medium text-gray-500">
                        Phone number
                      </dt>
                      <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        (+855) 16 571 913
                      </dd>
                    </div>
                    <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt class="text-sm font-medium text-gray-500">Address</dt>
                      <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        National Road 1, Sangkat Kakab 1
                        <br />
                        Phnom Penh, Cambodia 120912
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/2">
          <div className=" bg-slate-100 text-left flex items-center justify-center p-12">
            <div className="mx-auto w-full max-w-[550px]">
              <form action="https://formbold.com/s/FORM_ID" method="POST">
                <div className="mb-5">
                  <label
                    for="name"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Full Name"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
                <div className="mb-5">
                  <label
                    for="email"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="example@domain.com"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
                <div className="mb-5">
                  <label
                    for="subject"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    id="subject"
                    placeholder="Enter your subject"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
                <div className="mb-5">
                  <label
                    for="message"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Message
                  </label>
                  <textarea
                    rows="4"
                    name="message"
                    id="message"
                    placeholder="Type your message"
                    className="w-full resize-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  ></textarea>
                </div>
                <div>
                  <button className="bg-sky-500 hover:bg-sky-300 rounded-md bg-blue py-3 px-8 text-base font-semibold text-white outline-none mr-2">
                    Reset
                  </button>
                  <button className="hover:bg-blue-400 rounded-md bg-blue-600 py-3 px-8 text-base font-semibold text-white outline-none">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Map />
    </>
  );
};

export default Contact;
