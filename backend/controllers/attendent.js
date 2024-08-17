import Attendant from "../models/attendant.js";

export const addAttendant = async (req, res) => {
  try {
    const { student_id, studentname, course_id, coursename } = req.body;

    const attendant = new Attendant({
      student_id,
      studentname,
      course_id,
      coursename,
      attendantdate: new Date(),
      isattend: false,
      createdDate: new Date(),
      updateDate: new Date(),
    });

    await attendant.save();
    res
      .status(201)
      .json({ message: "Attendant registered successfully", attendant });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// export const getCourse = async (req, res) => {
//   try {
//     const course = await Course.find().sort({ createdDate: -1 });

//     if (!course.length) {
//       return res.status(404).json({ message: "No Course found" });
//     }

//     res.status(200).json(course);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// export const getAttendentByStudentId = async (req, res) => {
//   try {
//     const { _id } = req.params;

//     if (!_id) {
//       return res.status(400).json({ message: "Student Id is required" });
//     }

//     const studentId = await Attendant.findOne({ _id });

//     if (!studentId) {
//       return res.status(404).json({ message: "Student Id not found" });
//     }
//     res.status(200).json(studentId);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

export const getAttendentByToday = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to midnight to start of the day
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const studentId = await Attendant.find({
      attendantdate: { $gte: today, $lt: tomorrow },
    });

    if (!studentId || studentId.length === 0) {
      return res.status(404).json({ message: "Today's attendant not found" });
    }
    res.status(200).json(studentId);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
// export const deleteCourseById = async (req, res) => {
//   const { _id } = req.params;

//   try {
//     const deletedCourse = await Course.findByIdAndDelete(_id);

//     if (!deletedCourse) {
//       return res.status(404).json({ message: "Course not found" });
//     }
//     res.status(200).json({ message: "Course deleted successfully" });
//   } catch (error) {
//     //console.error(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };
// export const updateCourseById = async (req, res) => {
//   try {
//     const { _id } = req.params;
//     const { coursename, description, sdate, edate, teacherid, room } = req.body;
//     const currentCourse = await Course.findById(_id);
//     if (!currentCourse) {
//       return res.status(404).json({ message: "Course not found" });
//     }

//     const updatedCourseData = {
//       coursename,
//       description,
//       sdate,
//       edate,
//       teacherid,
//       room,
//       updateDate: new Date(),
//     };

//     const updatedCourse = await Course.findByIdAndUpdate(
//       _id,
//       updatedCourseData,
//       {
//         new: true,
//       }
//     );

//     res.status(200).json({
//       message: "Updated successfully",
//       course: updatedCourse,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };
export const updateAttendentStatus = async (req, res) => {
  try {
    const { _id } = req.params;

    // Fetch the current user to get the current status
    const currentUser = await Attendant.findById(_id);
    if (!currentUser) {
      return res.status(404).json({ message: "Attendent not found" });
    }

    // Prepare updated user data
    const newStatus = !currentUser.isattend;

    // Prepare updated user data
    const updatedUserData = { ...req.body, isattend: newStatus };

    // Update the user with the new status
    const updatedUser = await Attendant.findByIdAndUpdate(
      _id,
      updatedUserData,
      {
        new: true,
      }
    );

    res.status(200).json({
      message: "Attendent status updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getAttendentByAll = async (req, res) => {
  try {
    const studentId = await Attendant.find().sort({ attendantdate: -1 });
    res.status(200).json(studentId);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getAttendentByName = async (req, res) => {
  try {
    const { studentname } = req.params;
    const studentId = await Attendant.find({
      studentname: { $regex: studentname, $options: "i" },
    });
    res.status(200).json(studentId);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAttendentById = async (req, res) => {
  try {
    const { _id } = req.params;
    const studentId = await Attendant.findOne({ _id });
    res.status(200).json(studentId);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
// export const getAttendentByCriteria = async (req, res) => {
//   try {
//     const { studentname, coursename, startDate, endDate } = req.query;

//     // Validate date range
//     if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
//       return res
//         .status(400)
//         .json({ message: "startDate cannot be greater than endDate" });
//     }

//     // Build the search criteria
//     const criteria = {};
//     if (studentname) {
//       criteria.studentname = { $regex: studentname, $options: 'i' };
//     }
//     if (coursename) {
//       criteria.coursename = { $regex: coursename, $options: 'i' };
//     }
//     if (startDate && endDate) {
//       criteria.attendantdate = {
//         $gte: new Date(startDate),
//         $lte: new Date(endDate),
//       };
//     } else if (startDate) {
//       criteria.attendantdate = { $gte: new Date(startDate) };
//     } else if (endDate) {
//       criteria.attendantdate = { $lte: new Date(endDate) };
//     }

//     // Perform the search with the criteria
//     const attendants = await Attendant.find(criteria);

//     res.status(200).json(attendants);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// export const getAttendentByCriteria = async (req, res) => {
//   try {
//     const { studentname, coursename, startDate, endDate } = req.query;

//     // Validate date range
//     if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
//       return res
//         .status(400)
//         .json({ message: "startDate cannot be greater than endDate" });
//     }

//     // Build the search criteria
//     const criteria = {};
//     if (studentname) {
//       criteria.studentname = { $regex: studentname, $options: "i" };
//     }
//     if (coursename) {
//       criteria.coursename = { $regex: coursename, $options: "i" };
//     }
//     if (startDate && endDate) {
//       criteria.attendantdate = {
//         $gte: new Date(startDate).toLocaleDateString(),
//         $lte: new Date(endDate).toLocaleDateString(),
//       };
//     } else if (startDate) {
//       criteria.attendantdate = { $gte: new Date(startDate) };
//     } else if (endDate) {
//       criteria.attendantdate = { $lte: new Date(endDate) };
//     }

//     // Perform the search with the criteria
//     const attendants = await Attendant.find(criteria);

//     res.status(200).json(attendants);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

export const getAttendentByCriteria = async (req, res) => {
  try {
    const { student_id, course_id, startDate, endDate } = req.query;

    // Validate date range
    if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
      return res
        .status(400)
        .json({ message: "startDate cannot be greater than endDate" });
    }

    // Build the search criteria
    const criteria = {};
    if (student_id) {
      criteria.student_id = student_id;
    }
    if (course_id) {
      criteria.course_id = course_id;
    }
    if (startDate && endDate) {
      criteria.attendantdate = {
        $gte: new Date(startDate).toLocaleDateString(),
        $lte: new Date(endDate).toLocaleDateString(),
      };
    } else if (startDate) {
      criteria.attendantdate = { $gte: new Date(startDate) };
    } else if (endDate) {
      criteria.attendantdate = { $lte: new Date(endDate) };
    }

    // Perform the search with the criteria
    const attendants = await Attendant.find(criteria);

    res.status(200).json(attendants);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getAttendentToday = async (req, res) => {
  try {
    // Get the start and end of today
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    // Find users with status true who registered today
    const users = await Attendant.find({
      // status: true,
      createdDate: { $gte: startOfToday, $lt: endOfToday },
    });

    if (users.length === 0) {
      return res
        .status(404)
        .json({ message: "No active attendant found today" });
    }

    // Send all active users registered today as the response
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching active course registered today:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getAttendentByCriteria2 = async (req, res) => {
  try {
    const { course_id, student_id, isattend, startDate, endDate } = req.query;

    // Validate date range
    if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
      return res
        .status(400)
        .json({ message: "startDate cannot be greater than endDate" });
    }

    // Build the search criteria
    const criteria = {};

    if (course_id) {
      criteria.course_id = { $regex: new RegExp(`^${course_id}$`, "i") };
    }
    if (student_id) {
      criteria.student_id = { $regex: new RegExp(`^${student_id}$`, "i") };
    }

    if (isattend) {
      criteria.isattend = isattend === "true";
    }

    if (startDate && endDate) {
      criteria.attendantdate = {
        $gte: new Date(startDate).toLocaleDateString(),
        $lte: new Date(endDate).toLocaleDateString(),
      };
    } else if (startDate) {
      criteria.attendantdate = { $gte: new Date(startDate) };
    } else if (endDate) {
      criteria.attendantdate = { $lte: new Date(endDate) };
    }
    // Perform the search with the criteria
    const course = await Attendant.find(criteria);

    res.status(200).json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
