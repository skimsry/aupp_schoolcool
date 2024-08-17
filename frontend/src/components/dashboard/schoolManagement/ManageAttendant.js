import React, { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormattedDate from "../FormattedDate";
import Slidebar from "../partial/Slidebar";
import Main from "../partial/Main";
import { UserContext } from "../../../ctx/UserContextProvider";

const apiUrl = process.env.REACT_APP_APIURL;
const ManageAttendant = () => {
  const { user, token } = useContext(UserContext);
  const UserID = user._id;
  const decodedToken = jwtDecode(token);
  const UserType = decodedToken.type;
  const [userStudent, setUserStudent] = useState([]);
  const [attendantStudent, setAttendantStudent] = useState([]);
  const [ourCourse, setOurCourse] = useState([]);
  const [userTeacher, setUserTeacher] = useState([]);
  const [selectedText, setSelectedText] = useState("");
  const [attId, setAttId] = useState(null);
  const [formData, setFormData] = useState({
    student_id: "",
    studentname: "",
    course_id: "",
    coursename: "",
  });
  const getClassEnrollment = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}api/classenrollment/getClassenrollmentById/${formData.course_id}`
      );

      setTeams2(response.data);
    } catch (error) {}
  };
  const [teams2, setTeams2] = useState([]);
  const getTeacher = async () => {
    try {
      const response = await axios.get(`${apiUrl}api/users/getUsersTeacher`);

      setUserTeacher(response.data);
    } catch (error) {
    } finally {
    }
  };
  const handleChange2 = async (e) => {
    const { name, value, type } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    // if (type === "select-one") {
    //   const selectedOptionText = e.target.options[e.target.selectedIndex].text;
    //   setSelectedText(selectedOptionText);
    // }
    if (type === "select-one") {
      const selectedOptionText = e.target.options[e.target.selectedIndex].text;
      const marketingText = selectedOptionText.split(" || ")[0].trim();
      setSelectedText(marketingText);
    }

    try {
      // Fetch class enrollment data
      const response = await axios.get(
        `${apiUrl}api/classenrollment/getClassenrollmentById/${value}`
      );

      const fetchedTeams = response.data;
      setTeams2(fetchedTeams);

      for (const user of fetchedTeams) {
        const attendant = attendantStudent.find(
          (attendant) =>
            attendant.student_id === user.student_id &&
            attendant.course_id === user.course_id
        );
        const student = userStudent.find(
          (student) => student._id === user.student_id
        );
        const firstName = student?.firstName;
        const lastName = student?.lastName;
        const studentId = user.student_id;
        const courseId = user.course_id;
        const coursename = e.target.options[e.target.selectedIndex].text
          .split(" || ")[0]
          .trim();
        if (!attendant) {
          const courseData = {
            // student_id: user.student_id,
            // course_id: user.course_id,
            student_id: studentId,
            studentname: `${firstName} ${lastName}`,
            course_id: courseId,
            coursename: coursename,
          };
          await axios.post(`${apiUrl}api/attendent/register`, courseData);
        }
      }
    } catch (error) {
      console.error("Error occurred while making requests:", error);
    }
  };

  const getUsersStudent = async () => {
    try {
      const response = await axios.get(`${apiUrl}api/users/getUsersStudent`);

      setUserStudent(response.data);
    } catch (error) {
    } finally {
    }
  };
  const getAttendantToday = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}api/attendent/getAttendantToday`
      );

      setAttendantStudent(response.data);
    } catch (error) {
    } finally {
    }
  };

  const getCourse = async () => {
    try {
      const response = await axios.get(`${apiUrl}api/course/getCourseStatus`);

      setOurCourse(response.data);
    } catch (error) {
      toast.error("Failed to fetch course data.");
    }
  };

  const handleReset = () => {
    setFormData({
      coursename: "",
      studentname: "",
      course_id: "",
      student_id: "",
    });

    setTeams2([]);
  };

  const handleEdit = (user) => {
    //setFormData({
    // student_id: user.student_id,
    // studentname: user.studentname,
    // course_id: user.course_id,
    // coursename: user.coursename,
    // });
    // console.log(formData);
  };

  useEffect(() => {
    getUsersStudent();
    getTeacher();
    getCourse();
    getAttendantToday();
    //getClassEnrollment();
  }, [apiUrl, teams2]);

  return (
    <>
      <Slidebar />
      <Main />
      <div className="ml-72 mr-8">
        <div className="text-left flex items-center justify-center p-12">
          <div className="mx-auto w-full">
            <div className="bg-white overflow-hidden shadow rounded-lg border">
              <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                <dl className="sm:divide-y sm:divide-gray-200">
                  <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Course Name <span className="text-red-500">*</span>
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <select
                        id="type"
                        name="course_id"
                        value={formData.course_id}
                        onChange={handleChange2}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option value="">Select course name...</option>

                        {/* {ourCourse.map((user, i) => (
                          <option value={user._id} key={user._id} className="">
                            {user.coursename}
                          </option>
                        ))} */}
                        {UserType === 1 &&
                          ourCourse.map((user, i) => (
                            <option
                              value={user._id}
                              key={user._id}
                              className="capitalize"
                            >
                              {user.coursename} || {" Teacher : "}
                              {
                                userTeacher.find(
                                  (teacher) => teacher._id === user.teacherid
                                )?.firstName
                              }{" "}
                              {
                                userTeacher.find(
                                  (teacher) => teacher._id === user.teacherid
                                )?.lastName
                              }
                            </option>
                          ))}
                        {UserType === 2 &&
                          ourCourse
                            .filter((item) => item.teacherid === UserID)
                            .map((user, i) => (
                              <option
                                value={user._id}
                                key={user._id}
                                className="capitalize"
                              >
                                {user.coursename} || {" Teacher : "}
                                {
                                  userTeacher.find(
                                    (teacher) => teacher._id === user.teacherid
                                  )?.firstName
                                }{" "}
                                {
                                  userTeacher.find(
                                    (teacher) => teacher._id === user.teacherid
                                  )?.lastName
                                }
                              </option>
                            ))}
                      </select>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>

            <button
              type="button"
              onClick={handleReset}
              className="mt-4 text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
            >
              Clear
            </button>
          </div>
        </div>
        <div className="shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="p-4 text-center">
                  <div className="flex items-center">
                    <label htmlFor="number" className="font-bold">
                      #
                    </label>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Student Name
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Gender
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Date of Birth
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Phone Number
                </th>

                <th scope="col" className="px-6 py-3 text-center">
                  Attendant Date
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Attendant Status
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {teams2.map((user, i) => (
                <tr
                  key={user._id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="w-4 p-4 text-center">
                    <div className="flex items-center">
                      <label htmlFor="1" className="">
                        {i + 1}.
                      </label>
                    </div>
                  </td>
                  <td className="px-6 py-4 uppercase text-center text-blue-800 font-bold">
                    {
                      userStudent.find(
                        (student) => student._id === user.student_id
                      )?.firstName
                    }{" "}
                    {
                      userStudent.find(
                        (student) => student._id === user.student_id
                      )?.lastName
                    }
                  </td>
                  <td className="px-6 py-4 capitalize text-center">
                    {
                      userStudent.find(
                        (student) => student._id === user.student_id
                      )?.gender
                    }
                  </td>

                  <td className="px-6 py-4 text-center">
                    <FormattedDate
                      date={
                        userStudent.find(
                          (student) => student._id === user.student_id
                        )?.dob
                      }
                    />
                  </td>

                  <td className="px-6 py-4 text-center">
                    {
                      userStudent.find(
                        (student) => student._id === user.student_id
                      )?.phoneNumber
                    }
                  </td>
                  <td className="px-6 py-4 text-center text-red-800">
                    <FormattedDate date={new Date().toLocaleString()} />
                  </td>
                  <td className="px-6 py-4 text-center">
                    {attendantStudent.find(
                      (attendant) =>
                        attendant.student_id === user.student_id &&
                        attendant.course_id === user.course_id
                      // && attendant.attendantdate === new Date().toString()
                    )?.isattend ? (
                      <i class="ri-shield-check-fill text-3xl text-green-500"></i>
                    ) : (
                      <i class="ri-shield-cross-fill text-3xl text-red-500"></i>
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {attendantStudent.find(
                      (attendant) =>
                        attendant.student_id === user.student_id &&
                        attendant.course_id === user.course_id
                    )?.isattend ? (
                      <button
                        type="button"
                        onClick={async () => {
                          const attendant = attendantStudent.find(
                            (attendant) =>
                              attendant.student_id === user.student_id &&
                              attendant.course_id === user.course_id
                          );

                          if (attendant) {
                            try {
                              const updatedUserData = {
                                updateDate: new Date(),
                              };

                              await axios.put(
                                `${apiUrl}api/attendent/updateAttendentStatus/${attendant._id}`,
                                updatedUserData
                              );
                              toast.success("Updated successfully.", {
                                position: "bottom-right",
                                autoClose: 1000,
                              });

                              getClassEnrollment();
                            } catch (error) {
                              toast.error("Cannot update. Please try again.", {
                                position: "bottom-right",
                                autoClose: 2000,
                              });
                            }
                          }
                        }}
                        className="text-white bg-blue-800 hover:bg-red-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                      >
                        <i className="ri-user-follow-line"></i>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={async () => {
                          const attendant = attendantStudent.find(
                            (attendant) =>
                              attendant.student_id === user.student_id &&
                              attendant.course_id === user.course_id
                          );

                          if (attendant) {
                            try {
                              const updatedUserData = {
                                updateDate: new Date(),
                              };

                              await axios.put(
                                `${apiUrl}api/attendent/updateAttendentStatus/${attendant._id}`,
                                updatedUserData
                              );
                              toast.success("Updated successfully.", {
                                position: "bottom-right",
                                autoClose: 1000,
                              });

                              getClassEnrollment();
                            } catch (error) {
                              toast.error("Cannot update. Please try again.", {
                                position: "bottom-right",
                                autoClose: 2000,
                              });
                            }
                          } else {
                            const student = userStudent.find(
                              (student) => student._id === user.student_id
                            );
                            const firstName = student?.firstName;
                            const lastName = student?.lastName;
                            const studentId = user.student_id;
                            const courseId = user.course_id;
                            const coursename = selectedText;

                            try {
                              const courseData = {
                                student_id: studentId,
                                studentname: `${firstName} ${lastName}`,
                                course_id: courseId,
                                coursename: coursename,
                              };

                              await axios.post(
                                `${apiUrl}api/attendent/register`,
                                courseData
                              );

                              toast.success("Assign Attendent successfully.", {
                                position: "bottom-right",
                                autoClose: 1000,
                              });

                              //handleReset();
                              // getTeam();
                              getClassEnrollment();
                            } catch (error) {
                              toast.error("Cannot update. Please try again.", {
                                position: "bottom-right",
                                autoClose: 2000,
                              });
                            }
                          }
                          // Find the student object once
                        }}
                        className="text-white bg-red-500 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                      >
                        <i className="ri-user-unfollow-line"></i>
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default ManageAttendant;
