import Textslideshow from "../models/textslideshow.js";

export const addTextslideshow = async (req, res) => {
  try {
    const {
      infrontStext,
      infronttext,
      slogantext,
      artistprofile,
      name,
      position,
    } = req.body;
    const textslideshow = new Textslideshow({
      infrontStext,
      infronttext,
      slogantext,
      artistprofile,
      name,
      position,
      createdDate: new Date(),
      updateDate: new Date(),
    });

    await textslideshow.save();
    res.status(201).json({
      message: "Text slideshow registered successfully",
      textslideshow,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getTextslideshow = async (req, res) => {
  try {
    const textslideshow = await Textslideshow.find()
      .sort({ createdDate: -1 })
      .limit(1);

    if (!textslideshow.length) {
      return res.status(404).json({ message: "No text slideshow found" });
    }

    res.status(200).json(textslideshow);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateTextslideshow = async (req, res) => {
  try {
    const { _id } = req.params;
    const {
      infrontStext,
      infronttext,
      slogantext,
      artistprofile,
      name,
      position,
    } = req.body;

    const currentTextslideshow = await Textslideshow.findById(_id);
    if (!currentTextslideshow) {
      return res.status(404).json({ message: "Text slideshow not found" });
    }

    const updatedTextslideshowData = {
      infrontStext,
      infronttext,
      slogantext,
      artistprofile,
      name,
      position,
      updateDate: new Date(),
    };

    const updatedTextslideshow = await Textslideshow.findByIdAndUpdate(
      _id,
      updatedTextslideshowData,
      {
        new: true,
      }
    );

    res.status(200).json({
      message: "Updated text slideshow successfully",
      textslideshow: updatedTextslideshow,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
