import Awelcome from "../models/awelcome.js";

export const addAwelcome = async (req, res) => {
  try {
    const { coverimg, title, content } = req.body;
    const awelcome = new Awelcome({
      coverimg,
      title,
      content,
      createdDate: new Date(),
      updateDate: new Date(),
    });

    await awelcome.save();
    res
      .status(201)
      .json({ message: "Welcome registered successfully", awelcome });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getWelcome = async (req, res) => {
  try {
    const awelcome = await Awelcome.find().sort({ createdDate: -1 }).limit(1);

    if (!awelcome.length) {
      return res.status(404).json({ message: "No welcome found" });
    }

    res.status(200).json(awelcome);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateWelcome = async (req, res) => {
  try {
    const { _id } = req.params;
    const { coverimg, title, content } = req.body;

    const currentAwelcome = await Awelcome.findById(_id);
    if (!currentAwelcome) {
      return res.status(404).json({ message: "Welcome not found" });
    }

    const updatedWelcomeData = {
      coverimg,
      title,
      content,
      updateDate: new Date(),
    };

    const updatedWelcome = await Awelcome.findByIdAndUpdate(
      _id,
      updatedWelcomeData,
      {
        new: true,
      }
    );

    res.status(200).json({
      message: "Updated welcome successfully",
      awelcome: updatedWelcome,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
