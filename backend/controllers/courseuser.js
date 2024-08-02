import mongoose from "mongoose";
import User from "../models/user.js";
import Course from "../models/course.js";
export const combineUC = async (req, res) => {
  try {
    const teacherId = mongoose.Types.ObjectId(req.params.id);

    const userWithCourse = await User.aggregate([
      { $match: { _id: teacherId } },
      {
        $lookup: {
          from: "course",
          localField: "_id",
          foreignField: "teacherId",
          as: "course",
        },
      },
      { $unwind: { path: "$course", preserveNullAndEmptyArrays: true } },
    ]);

    if (userWithCourse.length === 0) {
      return res.status(404).send("User not found");
    }

    res.json(userWithCourse[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};
