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
