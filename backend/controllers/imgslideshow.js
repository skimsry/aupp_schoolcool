import Imgslideshow from "../models/imgslideshow.js";

export const addImgslideshow = async (req, res) => {
  try {
    const { imgslideshow, name, description } = req.body;
    const imgslideshows = new Imgslideshow({
      imgslideshow,
      name,
      description,
      createdDate: new Date(),
      updateDate: new Date(),
    });

    await imgslideshows.save();
    res
      .status(201)
      .json({ message: "Cover image registered successfully", imgslideshows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getImgslideshow = async (req, res) => {
  try {
    const imgslideshows = await Imgslideshow.find().sort({ createdDate: -1 });

    if (!imgslideshows.length) {
      return res.status(404).json({ message: "No Image Slideshow found" });
    }

    res.status(200).json(imgslideshows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getImgslideshowByName = async (req, res) => {
  try {
    const { name } = req.params;

    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    const imgslideshows = await Imgslideshow.find({
      name: { $regex: name, $options: "i" },
    });

    if (!imgslideshows) {
      return res.status(404).json({ message: "Image Slideshow not found" });
    }
    res.status(200).json(imgslideshows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const deleteImgslideshowById = async (req, res) => {
  const { _id } = req.params;

  try {
    const deletedImgslideshow = await Imgslideshow.findByIdAndDelete(_id);

    if (!deletedImgslideshow) {
      return res.status(404).json({ message: "Image Slideshow not found" });
    }
    res.status(200).json({ message: "Image Slideshow deleted successfully" });
  } catch (error) {
    //console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
