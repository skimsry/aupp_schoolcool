// import React, { useContext, useEffect } from "react";
// import { UserContext } from "../../../ctx/UserContextProvider";
// const apiUrl = process.env.REACT_APP_APIURL;

// function FirstContact() {
//   const { showContact, setShowContact, getContact } = useContext(UserContext);
//   useEffect(() => {
//     getContact();
//   }, [apiUrl, getContact]);
//   const handleChange = (e, index) => {
//     const { name, value } = e.target;

//     const updatedFcontact = [...showContact];
//     updatedFcontact[index] = { ...updatedFcontact[index], [name]: value };

//     setShowContact(updatedFcontact);
//   };
//   return (
//     // <div className="ml-72 mr-8">
//     <div className="text-left flex items-center justify-center p-12">
//       {showContact.map((fcontact) => (
//         <div className="mx-auto w-full">
//           <div className="bg-white overflow-hidden shadow rounded-lg border">
//             <div className="px-4 py-5 sm:px-6">
//               <div>
//                 <label
//                   for="first_name"
//                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                 >
//                   Title <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   id="first_name"
//                   value={fcontact.title}
//                   onChange={(e) => handleChange(e, index)}
//                   className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   placeholder="Fast Contact Here"
//                   required
//                 />
//               </div>
//               <div>
//                 <label
//                   for="first_name"
//                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                 >
//                   Sub Title <span className="text-red-500">*</span>
//                 </label>
//                 <textarea
//                   id="message"
//                   rows="4"
//                   value={fcontact.subtitle}
//                   onChange={(e) => handleChange(e, index)}
//                   className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   placeholder="Write your subtitle here..."
//                 ></textarea>
//               </div>
//             </div>
//             <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
//               <dl className="sm:divide-y sm:divide-gray-200">
//                 <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
//                   <dt className="text-sm font-medium text-gray-500">
//                     Full name <span className="text-red-500">*</span>
//                   </dt>
//                   <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
//                     <input
//                       type="text"
//                       id="first_name"
//                       value={fcontact.fullname}
//                       onChange={(e) => handleChange(e, index)}
//                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                       placeholder="SORN KIMSRY"
//                       required
//                     />
//                   </dd>
//                 </div>
//                 <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
//                   <dt className="text-sm font-medium text-gray-500">
//                     Email address <span className="text-red-500">*</span>
//                   </dt>
//                   <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
//                     <input
//                       type="text"
//                       id="first_name"
//                       value={fcontact.email}
//                       onChange={(e) => handleChange(e, index)}
//                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                       placeholder="sornkimsry@yahoo.com"
//                       required
//                     />
//                   </dd>
//                 </div>
//                 <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
//                   <dt className="text-sm font-medium text-gray-500">
//                     Phone number <span className="text-red-500">*</span>
//                   </dt>
//                   <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
//                     <input
//                       type="text"
//                       id="first_name"
//                       value={fcontact.phone}
//                       onChange={(e) => handleChange(e, index)}
//                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                       placeholder="016571913"
//                       required
//                     />
//                   </dd>
//                 </div>
//                 <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
//                   <dt className="text-sm font-medium text-gray-500">
//                     Address <span className="text-red-500">*</span>
//                   </dt>
//                   <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
//                     <textarea
//                       id="message"
//                       rows="4"
//                       value={fcontact.address}
//                       onChange={(e) => handleChange(e, index)}
//                       className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                       placeholder="Write your address here..."
//                     ></textarea>
//                   </dd>
//                 </div>
//               </dl>
//             </div>
//           </div>
//           <button
//             type="button"
//             className="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
//           >
//             Update
//           </button>
//         </div>
//       ))}
//     </div>
//     // </div>
//   );
// }

// export default FirstContact;

import React, { useContext, useEffect } from "react";
import { UserContext } from "../../../ctx/UserContextProvider";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const apiUrl = process.env.REACT_APP_APIURL;

function FirstContact() {
  const { showContact, setShowContact, getContact } = useContext(UserContext);

  useEffect(() => {
    getContact();
  }, [apiUrl]);
  const handleSubmit = async (
    fcontactId,
    covertitle,
    title,
    subtitle,
    fullname,
    email,
    phone,
    address
  ) => {
    const emptyFields = showContact.filter(
      (fcontact) => fcontact.covertitle.trim() === ""
    );
    if (emptyFields.length > 0) {
      toast.error("Cannot empty this field to update.", {
        position: "bottom-right",
        autoClose: 3000,
      });
    } else {
      try {
        const updatedMapData = {
          covertitle,
          title,
          subtitle,
          fullname,
          email,
          phone,
          address,
          updateDate: new Date(),
        };

        const response = await axios.put(
          `${apiUrl}api/fastcontact/updateFastcontact/${fcontactId}`,
          updatedMapData
        );

        toast.success("Updated successfully.", {
          position: "bottom-right",
          autoClose: 1000,
        });
        // getMap();
        getContact();
      } catch (error) {
        //setLoading(false);
        toast.error("Cannot update. Please try again.", {
          position: "bottom-right",
          autoClose: 2000,
        });
      } finally {
        //setLoading(false);
      }
    }
  };
  const handleChange = (e, index) => {
    const { name, value } = e.target;

    const updatedFcontact = [...showContact];
    updatedFcontact[index] = { ...updatedFcontact[index], [name]: value };

    setShowContact(updatedFcontact);
  };

  return (
    <div className="text-left flex items-center justify-center p-12">
      {showContact.map((fcontact, index) => (
        <div key={index} className="mx-auto w-full">
          <div className="bg-white overflow-hidden shadow rounded-lg border">
            <div className="px-4 py-5 sm:px-6">
              <div>
                <label
                  htmlFor={`title-${index}`}
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Cover Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id={`title-${index}`}
                  name="covertitle"
                  value={fcontact.covertitle}
                  onChange={(e) => handleChange(e, index)}
                  className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Fast Contact Here"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor={`title-${index}`}
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id={`title-${index}`}
                  name="title"
                  value={fcontact.title}
                  onChange={(e) => handleChange(e, index)}
                  className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Fast Contact Here"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor={`subtitle-${index}`}
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Sub Title <span className="text-red-500">*</span>
                </label>
                <textarea
                  id={`subtitle-${index}`}
                  name="subtitle"
                  rows="4"
                  value={fcontact.subtitle}
                  onChange={(e) => handleChange(e, index)}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Write your subtitle here..."
                ></textarea>
              </div>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
              <dl className="sm:divide-y sm:divide-gray-200">
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Full name <span className="text-red-500">*</span>
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <input
                      type="text"
                      id={`fullname-${index}`}
                      name="fullname"
                      value={fcontact.fullname}
                      onChange={(e) => handleChange(e, index)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="SORN KIMSRY"
                      required
                    />
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Email address <span className="text-red-500">*</span>
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <input
                      type="email"
                      id={`email-${index}`}
                      name="email"
                      value={fcontact.email}
                      onChange={(e) => handleChange(e, index)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="sornkimsry@yahoo.com"
                      required
                    />
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Phone number <span className="text-red-500">*</span>
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <input
                      type="text"
                      id={`phone-${index}`}
                      name="phone"
                      value={fcontact.phone}
                      onChange={(e) => handleChange(e, index)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="016571913"
                      required
                    />
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Address <span className="text-red-500">*</span>
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <textarea
                      id={`address-${index}`}
                      name="address"
                      rows="4"
                      value={fcontact.address}
                      onChange={(e) => handleChange(e, index)}
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Write your address here..."
                    ></textarea>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
          <button
            type="button"
            onClick={(e) =>
              handleSubmit(
                fcontact._id,
                fcontact.covertitle,
                fcontact.title,
                fcontact.subtitle,
                fcontact.fullname,
                fcontact.email,
                fcontact.phone,
                fcontact.address
              )
            }
            className="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Update
          </button>
          <ToastContainer />
        </div>
      ))}
    </div>
  );
}

export default FirstContact;
