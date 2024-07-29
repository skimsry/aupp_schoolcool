import Aboutus from "../models/aboutus.js";

export const addAboutus = async (req, res) => {
  try {
    const { text, historys, vision, mission, career, license } = req.body;
    const aboutus = new Aboutus({
      text,
      historys,
      vision,
      mission,
      career,
      license,
      createdDate: new Date(),
      updateDate: new Date(),
    });

    await aboutus.save();
    res.status(201).json({ message: "Map registered successfully", aboutus });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAboutus = async (req, res) => {
  try {
    const aboutus = await Aboutus.find().sort({ createdDate: -1 }).limit(1);

    if (!aboutus.length) {
      return res.status(404).json({ message: "No Aboutus found" });
    }

    res.status(200).json(aboutus);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateAboutus = async (req, res) => {
  try {
    const { _id } = req.params;
    const { text, historys, vision, mission, career, license } = req.body;

    const currentAboutus = await Aboutus.findById(_id);
    if (!currentAboutus) {
      return res.status(404).json({ message: "Aboutus not found" });
    }

    const updatedAboutusData = {
      text,
      historys,
      vision,
      mission,
      career,
      license,
      updateDate: new Date(),
    };
    //console.log(updatedMapData);
    const updatedAboutus = await Aboutus.findByIdAndUpdate(
      _id,
      updatedAboutusData,
      {
        new: true,
      }
    );

    res.status(200).json({
      message: "Updated Aboutus successfully",
      aboutus: updatedAboutus,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
