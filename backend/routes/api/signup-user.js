import { signUpUser } from "../../controllers/user.js";

export default async (req, res) => {
  try {
    let {
      fname,
      lname,
      username,
      phoneNumber,
      type,
      email,
      password,
      status,
      createdDate,
      updateDate,
    } = req.body;

    const { user, token } = await signUpUser({
      fname,
      lname,
      username,
      phoneNumber,
      type,
      email,
      password,
      status: 1,
      createdDate: new Date(),
      updateDate: new Date(),
    });
    console.log(user);
    res.json({ user, token });
  } catch (error) {
    res.status(403).json(error);
  }
};
