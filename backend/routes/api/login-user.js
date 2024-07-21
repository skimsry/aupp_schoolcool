import { loginUser } from "../../controllers/user.js";
export default async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await loginUser({ email, password });
    req.session.user = {
      id: user._id,
      email: user.email,
    };

    // return res.redirect("/dashboard");
  } catch (error) {
    // res.redirect("/login");
  }
};
