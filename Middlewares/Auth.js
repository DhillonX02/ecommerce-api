import jwt from "jsonwebtoken";
import { User } from "../Models/User.js";

export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.header("Auth");

    if (!token) {
      return res.status(401).json({ message: "Login first. Token is missing" });
    }

    const decoded = jwt.verify(token, process.env.JWT);
    const id = decoded.userId;

    let user = await User.findById(id);

    if (!user) return res.json({ message: "User not found" });

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};
