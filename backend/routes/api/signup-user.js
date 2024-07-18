import { signUpUser } from "../../controllers/user.js";

export default async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      username,
      phoneNumber,
      email,
      password,
      type,
      status,
    } = req.body;

    const { user, token } = await signUpUser({
      firstName,
      lastName,
      username,
      phoneNumber,
      email,
      password,
      type,
      status,
      createdDate: new Date(),
      updateDate: new Date(),
    });
    res.json({ user, token });
  } catch (error) {
    console.error("Error during sign up:", error);
    res
      .status(403)
      .json({ error: error.message || "An error occurred during sign up." });
  }
};
