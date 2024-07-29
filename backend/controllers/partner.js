import Partner from "../models/partner.js";

export const addPartner = async (req, res) => {
  try {
    const { logoimg, name, description } = req.body;
    //const logoimg = req.file.filename;
    // const existingPartner = await Partner.findOne({ name });

    // if (existingPartner) {
    //   return res.status(400).json({ message: "Partner already exists!" });
    // }

    const partner = new Partner({
      logoimg,
      name,
      description,
      createdDate: new Date(),
      updateDate: new Date(),
    });

    await partner.save();
    res
      .status(201)
      .json({ message: "Partner registered successfully", partner });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getPartner = async (req, res) => {
  try {
    const partner = await Partner.find().sort({ createdDate: -1 });

    if (!partner.length) {
      return res.status(404).json({ message: "No Partner found" });
    }

    res.status(200).json(partner);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getPartnerByName = async (req, res) => {
  try {
    const { name } = req.params;

    if (!name) {
      return res.status(400).json({ message: "Company name is required" });
    }

    // const partner = await Partner.findOne({ name });
    // const partner = await Partner.find({ name });
    const partner = await Partner.find({
      name: { $regex: name, $options: "i" },
    });

    if (!partner) {
      return res.status(404).json({ message: "Partner not found" });
    }
    res.status(200).json(partner);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const deletePartnerById = async (req, res) => {
  const { _id } = req.params;

  try {
    const deletedPartner = await Partner.findByIdAndDelete(_id);

    if (!deletedPartner) {
      return res.status(404).json({ message: "Partner not found" });
    }
    res.status(200).json({ message: "Partner deleted successfully" });
  } catch (error) {
    //console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
