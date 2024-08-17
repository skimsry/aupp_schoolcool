import Toc from "../models/toc.js";

export const addToc = async (req, res) => {
  try {
    const { text } = req.body;
    const toc = new Toc({
      text,
      createdDate: new Date(),
      updateDate: new Date(),
    });

    await toc.save();
    res.status(201).json({
      message: "Terms and Conditions registered successfully",
      toc,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getToc = async (req, res) => {
  try {
    const toc = await Toc.find().sort({ createdDate: -1 }).limit(1);

    if (!toc.length) {
      return res.status(404).json({ message: "No TOC found" });
    }

    res.status(200).json(toc);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateToc = async (req, res) => {
  try {
    const { _id } = req.params;
    const { text } = req.body;

    const currentToc = await Toc.findById(_id);
    if (!currentToc) {
      return res.status(404).json({ message: "TOC not found" });
    }

    const updatedTocData = {
      text,
      updateDate: new Date(),
    };
    //console.log(updatedMapData);
    const updatedToc = await Toc.findByIdAndUpdate(_id, updatedTocData, {
      new: true,
    });

    res.status(200).json({
      message: "Updated Toc successfully",
      toc: updatedToc,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
