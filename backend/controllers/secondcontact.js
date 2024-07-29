import Secondcontact from "../models/secondcontact.js";

export const signUpContact = async (req, res) => {
  try {
    const { fullname, email, subject, message } = req.body;

    // Create a new user
    const secondcontact = new Secondcontact({
      fullname,
      email,
      subject,
      message,
      createdDate: new Date(),
      updateDate: new Date(),
    });

    // Save the user to the database
    await secondcontact.save();
    res
      .status(201)
      .json({ message: "Second registered successfully", secondcontact });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getSecondcontact = async (req, res) => {
  try {
    const secondcontact = await Secondcontact.find().sort({ createdDate: -1 });

    if (!secondcontact.length) {
      return res.status(404).json({ message: "No Second Contact found" });
    }

    res.status(200).json(secondcontact);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const deleteMessageById = async (req, res) => {
  const { _id } = req.params;

  try {
    const deletedMessage = await Secondcontact.findByIdAndDelete(_id);

    if (!deletedMessage) {
      return res.status(404).json({ message: "Message not found" });
    }
    res.status(200).json({ message: "Message deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getMessageByEmail = async (req, res) => {
  try {
    const { email } = req.params;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // const user = await Secondcontact.findOne({ email });
    const user = await Secondcontact.find({
      email: { $regex: name, $options: "i" },
    });

    // console.log(user);
    if (!user) {
      return res.status(404).json({ message: "Email not found" });
    }

    // Send the user as the response
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
