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
      isattend: true,
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
