import jwt from "jsonwebtoken";

const verifyRole = (requiredRoles) => {
  const JWTCODE = process.env.JWT_SECRET;
  return (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Extract token part

    if (!token) {
      return res
        .status(401)
        .json({ message: "Access denied. No token provided." });
    }

    try {
      const decoded = jwt.verify(token, JWTCODE);
      console.log("Decoded Token:", decoded); // Log decoded token for debugging
      req.user = decoded;

      if (requiredRoles.includes(req.user.type)) {
        next();
      } else {
        res
          .status(403)
          .json({ message: "Access denied. Insufficient permissions." });
      }
    } catch (error) {
      console.error("Token Verification Error:", error); // Log error for debugging
      res.status(400).json({ message: "Invalid token." });
    }
  };
};

export default verifyRole;
