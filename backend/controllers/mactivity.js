import Mactivity from "../models/mactivity.js";

export const addMactivity = async (req, res) => {
  try {
    const { text } = req.body;
    const mactivity = new Mactivity({
      text,
      createdDate: new Date(),
      updateDate: new Date(),
    });

    await mactivity.save();
    res
      .status(201)
      .json({ message: "Activity registered successfully", mactivity });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getMactivity = async (req, res) => {
  try {
    const mactivity = await Mactivity.find().sort({ createdDate: -1 }).limit(1);

    if (!mactivity.length) {
      return res.status(404).json({ message: "No announcement found" });
    }

    res.status(200).json(mactivity);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateMactivity = async (req, res) => {
  try {
    const { _id } = req.params;
    const { text } = req.body;

    const currentMactivity = await Mactivity.findById(_id);
    if (!currentMactivity) {
      return res.status(404).json({ message: "Activity not found" });
    }

    const updatedMactivityData = {
      text,
      updateDate: new Date(),
    };

    const updatedMactivity = await Mactivity.findByIdAndUpdate(
      _id,
      updatedMactivityData,
      {
        new: true,
      }
    );

    res.status(200).json({
      message: "Updated announcement successfully",
      mactivity: updatedMactivity,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
