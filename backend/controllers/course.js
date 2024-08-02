import Course from "../models/course.js";

export const addCourse = async (req, res) => {
  try {
    const { coursename, description, sdate, edate, teacherid, room } = req.body;

    const course = new Course({
      coursename,
      description,
      sdate,
      edate,
      teacherid,
      room,
      createdDate: new Date(),
      updateDate: new Date(),
    });

    await course.save();
    res.status(201).json({ message: "Course registered successfully", course });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getCourse = async (req, res) => {
  try {
    const course = await Course.find().sort({ createdDate: -1 });

    if (!course.length) {
      return res.status(404).json({ message: "No Course found" });
    }

    res.status(200).json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getCourseByName = async (req, res) => {
  try {
    const { coursename } = req.params;

    if (!coursename) {
      return res.status(400).json({ message: "Coursename is required" });
    }

    // const course = await Course.find({ name });
    const course = await Course.find({
      coursename: { $regex: coursename, $options: "i" },
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
export const deleteCourseById = async (req, res) => {
  const { _id } = req.params;

  try {
    const deletedCourse = await Course.findByIdAndDelete(_id);

    if (!deletedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    //console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const updateCourseById = async (req, res) => {
  try {
    const { _id } = req.params;
    const { coursename, description, sdate, edate, teacherid, room } = req.body;
    const currentCourse = await Course.findById(_id);
    if (!currentCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    const updatedCourseData = {
      coursename,
      description,
      sdate,
      edate,
      teacherid,
      room,
      updateDate: new Date(),
    };

    const updatedCourse = await Course.findByIdAndUpdate(
      _id,
      updatedCourseData,
      {
        new: true,
      }
    );

    res.status(200).json({
      message: "Updated successfully",
      course: updatedCourse,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
