import ClassEnrollment from "../models/classenrollment.js";

export const addClassEnrollment = async (req, res) => {
  try {
    const { course_id, student_id, course_name } = req.body;

    const classEnrollment = new ClassEnrollment({
      course_id,
      student_id,
      course_name,
      isdelete: false,
      createdDate: new Date(),
      updateDate: new Date(),
    });

    await classEnrollment.save();
    res.status(201).json({
      message: "ClassEnrollment registered successfully",
      classEnrollment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getClassEnrollment = async (req, res) => {
  try {
    const classEnrollment = await ClassEnrollment.find().sort({
      createdDate: -1,
    });

    if (!classEnrollment.length) {
      return res.status(404).json({ message: "No ClassEnrollment found" });
    }

    res.status(200).json(classEnrollment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getClassEnrollmentByName = async (req, res) => {
  try {
    const { course_name } = req.params;

    if (!course_name) {
      return res
        .status(400)
        .json({ message: "ClassEnrollmentname is required" });
    }

    // const classEnrollment = await ClassEnrollment.find({ name });
    const classEnrollment = await ClassEnrollment.find({
      course_name: { $regex: course_name, $options: "i" },
    });

    if (!classEnrollment) {
      return res.status(404).json({ message: "ClassEnrollment not found" });
    }
    res.status(200).json(classEnrollment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const deleteClassEnrollmentById = async (req, res) => {
  const { _id } = req.params;

  try {
    const deletedClassEnrollment = await ClassEnrollment.findByIdAndDelete(_id);

    if (!deletedClassEnrollment) {
      return res.status(404).json({ message: "ClassEnrollment not found" });
    }
    res.status(200).json({ message: "ClassEnrollment deleted successfully" });
  } catch (error) {
    //console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const updateClassEnrollmentById = async (req, res) => {
  try {
    const { _id } = req.params;
    const { course_id, student_id, course_name } = req.body;
    const currentClassEnrollment = await ClassEnrollment.findById(_id);
    if (!currentClassEnrollment) {
      return res.status(404).json({ message: "ClassEnrollment not found" });
    }

    const updatedClassEnrollmentData = {
      course_id,
      student_id,
      course_name,
      updateDate: new Date(),
    };

    const updatedClassEnrollment = await ClassEnrollment.findByIdAndUpdate(
      _id,
      updatedClassEnrollmentData,
      {
        new: true,
      }
    );

    res.status(200).json({
      message: "Updated successfully",
      classEnrollment: updatedClassEnrollment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getClassEnrollmentById = async (req, res) => {
  try {
    const { course_id } = req.params;

    if (!course_id) {
      return res
        .status(400)
        .json({ message: "ClassEnrollment Id is required" });
    }

    const classEnrollmentId = await ClassEnrollment.find({ course_id });
    // const classEnrollmentId = await ClassEnrollment.find({
    //   _id: { $regex: _id, $options: "i" },
    // });

    if (!classEnrollmentId) {
      return res.status(404).json({ message: "ClassEnrollment Id not found" });
    }
    res.status(200).json(classEnrollmentId);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getClassEnrollmentCheck = async (req, res) => {
  const { course_id, student_id } = req.query;

  try {
    const enrollmentExists = await ClassEnrollment.findOne({
      course_id,
      student_id,
    });
    if (enrollmentExists) {
      return res.json({ exists: true });
    } else {
      return res.json({ exists: false });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
export const getClassEnrollmentToday = async (req, res) => {
  try {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);
    const classEnrollment = await ClassEnrollment.find({
      createdDate: { $gte: startOfToday, $lt: endOfToday },
    });

    if (!classEnrollment.length) {
      return res.status(404).json({ message: "No ClassEnrollment found" });
    }

    res.status(200).json(classEnrollment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getClassEnrollmentByCriteria = async (req, res) => {
  try {
    const { course_name, student_id, isdelete, startDate, endDate } = req.query;

    // Validate date range
    if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
      return res
        .status(400)
        .json({ message: "startDate cannot be greater than endDate" });
    }

    // Build the search criteria
    const criteria = {};
    if (course_name) {
      criteria.course_name = { $regex: new RegExp(`^${course_name}$`, "i") };
    }
    if (student_id) {
      criteria.student_id = { $regex: new RegExp(`^${student_id}$`, "i") };
    }

    if (isdelete) {
      criteria.isdelete = isdelete === "true";
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
    const classenrollment = await ClassEnrollment.find(criteria);

    res.status(200).json(classenrollment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getClassEnrollmentByStudentId = async (req, res) => {
  //console.log("Hllo");
  try {
    const { student_id } = req.params;

    if (!student_id) {
      return res.status(400).json({ message: "Student Id is required" });
    }

    const classEnrollmentId = await ClassEnrollment.find({ student_id });
    // const classEnrollmentId = await ClassEnrollment.find({
    //   _id: { $regex: _id, $options: "i" },
    // });

    if (!classEnrollmentId) {
      return res.status(404).json({ message: "Student Id not found" });
    }
    res.status(200).json(classEnrollmentId);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
