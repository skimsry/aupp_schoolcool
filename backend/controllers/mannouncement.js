import Mannouncement from "../models/mannouncement.js";

export const addMAnnouncement = async (req, res) => {
  try {
    const { text } = req.body;
    const mannouncement = new Mannouncement({
      text,
      createdDate: new Date(),
      updateDate: new Date(),
    });

    await mannouncement.save();
    res
      .status(201)
      .json({ message: "Announcement registered successfully", mannouncement });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getMannouncement = async (req, res) => {
  try {
    const mannouncement = await Mannouncement.find()
      .sort({ createdDate: -1 })
      .limit(1);

    if (!mannouncement.length) {
      return res.status(404).json({ message: "No announcement found" });
    }

    res.status(200).json(mannouncement);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateMannouncement = async (req, res) => {
  try {
    const { _id } = req.params;
    const { text } = req.body;

    const currentMannouncement = await Mannouncement.findById(_id);
    if (!currentMannouncement) {
      return res.status(404).json({ message: "Announcement not found" });
    }

    const updatedMannouncementData = {
      text,
      updateDate: new Date(),
    };

    const updatedMannouncement = await Mannouncement.findByIdAndUpdate(
      _id,
      updatedMannouncementData,
      {
        new: true,
      }
    );

    res.status(200).json({
      message: "Updated announcement successfully",
      mannouncement: updatedMannouncement,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
