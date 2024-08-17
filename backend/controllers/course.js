import Course from "../models/course.js";
import mongoose from "mongoose";

export const addCourse = async (req, res) => {
  try {
    const { coursename, description, sdate, edate, teacherid, room, status } =
      req.body;

    const course = new Course({
      coursename,
      description,
      sdate,
      edate,
      teacherid,
      room,
      status,
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
export const getCourseStatus = async (req, res) => {
  try {
    const course = await Course.find({ status: true }).sort({
      createdDate: -1,
    });

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
    const { coursename, description, sdate, edate, teacherid, room, status } =
      req.body;
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
      status,
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

export const updateCourseStatus = async (req, res) => {
  try {
    const { _id } = req.params;

    // Fetch the current user to get the current status
    const currentCourse = await Course.findById(_id);
    if (!currentCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Toggle the status
    const newStatus = !currentCourse.status;

    // Prepare updated user data
    const updatedCourseData = { ...req.body, status: newStatus };

    // Update the user with the new status
    const updatedCourse = await Course.findByIdAndUpdate(
      _id,
      updatedCourseData,
      {
        new: true,
      }
    );

    res.status(200).json({
      message: "User status updated successfully",
      course: updatedCourse,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getCourseToday = async (req, res) => {
  try {
    // Get the start and end of today
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    // Find users with status true who registered today
    const users = await Course.find({
      // status: true,
      createdDate: { $gte: startOfToday, $lt: endOfToday },
    });

    if (users.length === 0) {
      return res.status(404).json({ message: "No active courses found today" });
    }

    // Send all active users registered today as the response
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching active course registered today:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getCourseByCriteria = async (req, res) => {
  try {
    const { coursename, teacherid, status, startDate, endDate } = req.query;

    // Validate date range
    if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
      return res
        .status(400)
        .json({ message: "startDate cannot be greater than endDate" });
    }

    // Build the search criteria
    const criteria = {};
    if (coursename) {
      criteria.coursename = { $regex: new RegExp(`^${coursename}$`, "i") };
    }
    if (teacherid) {
      criteria.teacherid = { $regex: new RegExp(`^${teacherid}$`, "i") };
    }

    if (status) {
      criteria.status = status === "true";
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
    const course = await Course.find(criteria);

    res.status(200).json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
