import Fastcontact from "../models/fastcontact.js";

export const addFastcontact = async (req, res) => {
  try {
    const { covertitle, title, subtitle, fullname, email, phone, address } =
      req.body;
    const fastcontact = new Fastcontact({
      covertitle,
      title,
      subtitle,
      fullname,
      email,
      phone,
      address,
      createdDate: new Date(),
      updateDate: new Date(),
    });

    await fastcontact.save();
    res
      .status(201)
      .json({ message: "Fast Contact registered successfully", fastcontact });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getFastcontact = async (req, res) => {
  try {
    const fastcontact = await Fastcontact.find()
      .sort({ createdDate: -1 })
      .limit(1);

    if (!fastcontact.length) {
      return res.status(404).json({ message: "No Fast Contact found" });
    }

    res.status(200).json(fastcontact);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateFastcontact = async (req, res) => {
  try {
    const { _id } = req.params;
    const { covertitle, title, subtitle, fullname, email, phone, address } =
      req.body;

    const currentFastcontact = await Fastcontact.findById(_id);
    if (!currentFastcontact) {
      return res.status(404).json({ message: "Fast Contact not found" });
    }

    const updatedFastcontactData = {
      covertitle,
      title,
      subtitle,
      fullname,
      email,
      phone,
      address,
      updateDate: new Date(),
    };
    //console.log(updatedMapData);
    const updatedFastcontact = await Fastcontact.findByIdAndUpdate(
      _id,
      updatedFastcontactData,
      {
        new: true,
      }
    );

    res.status(200).json({
      message: "Updated Fast Contact successfully",
      fastcontact: updatedFastcontact,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
