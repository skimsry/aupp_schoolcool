import Activity from "../models/activity.js";

export const addActivity = async (req, res) => {
  try {
    const { imgcover, title, content } = req.body;

    const activity = new Activity({
      imgcover,
      title,
      content,
      createdDate: new Date(),
      updateDate: new Date(),
    });

    await activity.save();
    res
      .status(201)
      .json({ message: "Activity registered successfully", activity });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getActivity = async (req, res) => {
  try {
    const activity = await Activity.find().sort({ createdDate: -1 });

    if (!activity.length) {
      return res.status(404).json({ message: "No Activity found" });
    }

    res.status(200).json(activity);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getActivityByName = async (req, res) => {
  try {
    const { title } = req.params;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const activity = await Activity.find({
      title: { $regex: title, $options: "i" },
    });

    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }
    res.status(200).json(activity);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const deleteActivityById = async (req, res) => {
  const { _id } = req.params;

  try {
    const deletedActivity = await Activity.findByIdAndDelete(_id);

    if (!deletedActivity) {
      return res.status(404).json({ message: "Activity not found" });
    }
    res.status(200).json({ message: "Activity deleted successfully" });
  } catch (error) {
    //console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const updateActivityById = async (req, res) => {
  try {
    const { _id } = req.params;
    const { imgcover, title, content } = req.body;
    const currentActivity = await Activity.findById(_id);
    if (!currentActivity) {
      return res.status(404).json({ message: "Activity not found" });
    }

    const updatedActivityData = {
      imgcover,
      title,
      content,
      updateDate: new Date(),
    };

    const updatedActivity = await Activity.findByIdAndUpdate(
      _id,
      updatedActivityData,
      {
        new: true,
      }
    );

    res.status(200).json({
      message: "Updated successfully",
      activity: updatedActivity,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
