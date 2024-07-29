import Announcement from "../models/announcement.js";

export const addAnnouncement = async (req, res) => {
  try {
    const { imgcover, title, content } = req.body;

    const announcement = new Announcement({
      imgcover,
      title,
      content,
      createdDate: new Date(),
      updateDate: new Date(),
    });

    await announcement.save();
    res
      .status(201)
      .json({ message: "Announcement registered successfully", announcement });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.find().sort({ createdDate: -1 });

    if (!announcement.length) {
      return res.status(404).json({ message: "No Announcement found" });
    }

    res.status(200).json(announcement);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAnnouncementByName = async (req, res) => {
  try {
    const { title } = req.params;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const announcement = await Announcement.find({
      title: { $regex: title, $options: "i" },
    });

    if (!announcement) {
      return res.status(404).json({ message: "Announcement not found" });
    }
    res.status(200).json(announcement);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const deleteAnnouncementById = async (req, res) => {
  const { _id } = req.params;

  try {
    const deletedAnnouncement = await Announcement.findByIdAndDelete(_id);

    if (!deletedAnnouncement) {
      return res.status(404).json({ message: "Announcement not found" });
    }
    res.status(200).json({ message: "Announcement deleted successfully" });
  } catch (error) {
    //console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const updateAnnouncementById = async (req, res) => {
  try {
    const { _id } = req.params;
    const { imgcover, title, content } = req.body;
    const currentAnnouncement = await Announcement.findById(_id);
    if (!currentAnnouncement) {
      return res.status(404).json({ message: "Announcement not found" });
    }

    const updatedAnnouncementData = {
      imgcover,
      title,
      content,
      updateDate: new Date(),
    };

    const updatedAnnouncement = await Announcement.findByIdAndUpdate(
      _id,
      updatedAnnouncementData,
      {
        new: true,
      }
    );

    res.status(200).json({
      message: "Updated successfully",
      announcement: updatedAnnouncement,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
