import Managescore from "../models/studentscore.js";
import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;

// Function to calculate the grade based on the total score
const calculateGrade = (total) => {
  if (total >= 90) return "A";
  if (total >= 80) return "B";
  if (total >= 70) return "C";
  if (total >= 60) return "D";
  return "F";
};
export const addManagescore = async (req, res) => {
  try {
    const {
      course_id,
      coursename,
      student_id,
      studentname,
      assignment,
      midterm,
      final,
    } = req.body;
    const total = assignment + midterm + final;
    const grade = calculateGrade(total);
    const managescore = new Managescore({
      course_id,
      coursename,
      student_id,
      studentname,
      assignment,
      midterm,
      final,
      total,
      grade,
      createdDate: new Date(),
      updateDate: new Date(),
    });

    await managescore.save();
    res
      .status(201)
      .json({ message: "Score registered successfully", managescore });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getManagescore = async (req, res) => {
  try {
    const managescore = await Managescore.find().sort({ createdDate: -1 });

    if (!managescore.length) {
      return res.status(404).json({ message: "No Score found" });
    }

    res.status(200).json(managescore);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getScoreByName = async (req, res) => {
  try {
    const { studentname } = req.params;

    if (!studentname) {
      return res.status(400).json({ message: "Course name is required" });
    }

    // const course = await Course.find({ name });
    const course = await Managescore.find({
      studentname: { $regex: studentname, $options: "i" },
    });

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const deleteScoreById = async (req, res) => {
  const { _id } = req.params;

  try {
    const deletedScore = await Managescore.findByIdAndDelete(_id);

    if (!deletedScore) {
      return res.status(404).json({ message: "Score not found" });
    }
    res.status(200).json({ message: "Score deleted successfully" });
  } catch (error) {
    //console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const updateScoreById = async (req, res) => {
  try {
    const { _id } = req.params;
    const {
      course_id,
      coursename,
      student_id,
      studentname,
      assignment,
      midterm,
      final,
    } = req.body;
    const total = assignment + midterm + final;
    const grade = calculateGrade(total);
    const currentScore = await Managescore.findById(_id);
    if (!currentScore) {
      return res.status(404).json({ message: "Course not found" });
    }
    const updatedScoreData = {
      course_id,
      coursename,
      student_id,
      studentname,
      assignment,
      midterm,
      final,
      total,
      grade,
      updateDate: new Date(),
    };

    const updatedScore = await Managescore.findByIdAndUpdate(
      _id,
      updatedScoreData,
      {
        new: true,
      }
    );

    res.status(200).json({
      message: "Updated successfully",
      managescore: updatedScore,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getScoreById = async (req, res) => {
  try {
    const { course_id } = req.params;

    if (!course_id) {
      return res.status(400).json({ message: "Score Id is required" });
    }

    const scoreId = await Managescore.find({ course_id });

    if (!scoreId) {
      return res.status(404).json({ message: "Score Id not found" });
    }
    res.status(200).json(scoreId);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getScoresToday = async (req, res) => {
  try {
    // Get the start and end of today
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    // Find users with status true who registered today
    const users = await Managescore.find({
      // status: true,
      createdDate: { $gte: startOfToday, $lt: endOfToday },
    });

    if (users.length === 0) {
      return res.status(404).json({ message: "No active scores found today" });
    }

    // Send all active users registered today as the response
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching active course registered today:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getScoreByCriteria = async (req, res) => {
  try {
    const {
      course_id,
      student_id,
      assignment,
      midterm,
      final,
      total,
      grade,
      startDate,
      endDate,
    } = req.query;

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

    if (assignment) {
      criteria.assignment = assignment;
    }
    if (midterm) {
      criteria.midterm = midterm;
    }
    if (final) {
      criteria.final = final;
    }
    if (total) {
      criteria.total = total;
    }

    if (grade) {
      criteria.grade = { $regex: new RegExp(`^${grade}$`, "i") };
    }
    if (startDate && endDate) {
      criteria.createdDate = {
        $gte: new Date(startDate).toLocaleDateString(),
        $lte: new Date(endDate).toLocaleDateString(),
      };
    } else if (startDate) {
      criteria.createdDate = { $gte: new Date(startDate) };
    } else if (endDate) {
      criteria.createdDate = { $lte: new Date(endDate) };
    }
    // Perform the search with the criteria
    const course = await Managescore.find(criteria);

    res.status(200).json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getScoreFromTeacherByCriteria = async (req, res) => {
  try {
    const { course_id } = req.query;

    // Build the search criteria
    const criteria = {};

    // If course_id is an array or a single value
    if (course_id) {
      // Check if course_id is a string and split it into an array if necessary
      const courseIdArray = Array.isArray(course_id)
        ? course_id
        : course_id.split(",");

      criteria.course_id = {
        $in: courseIdArray.map((id) => new RegExp(`^${id}$`, "i")),
      };
    }

    const course = await Managescore.find(criteria);

    res.status(200).json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
