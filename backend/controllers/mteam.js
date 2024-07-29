import Mteam from "../models/mteam.js";

export const addMteam = async (req, res) => {
  try {
    const { text } = req.body;
    const mteam = new Mteam({
      text,
      createdDate: new Date(),
      updateDate: new Date(),
    });

    await mteam.save();
    res
      .status(201)
      .json({ message: "Message Team registered successfully", mteam });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getMteam = async (req, res) => {
  try {
    const mteam = await Mteam.find().sort({ createdDate: -1 }).limit(1);

    if (!mteam.length) {
      return res.status(404).json({ message: "No message team found" });
    }

    res.status(200).json(mteam);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateMteam = async (req, res) => {
  try {
    const { _id } = req.params;
    const { text } = req.body;

    const currentMteam = await Mteam.findById(_id);
    if (!currentMteam) {
      return res.status(404).json({ message: "Message team not found" });
    }

    const updatedMteamData = {
      text,
      updateDate: new Date(),
    };

    const updatedMteam = await Mteam.findByIdAndUpdate(_id, updatedMteamData, {
      new: true,
    });

    res.status(200).json({
      message: "Updated message team successfully",
      mteam: updatedMteam,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
