import Managescore from "../models/studentscore.js";
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
