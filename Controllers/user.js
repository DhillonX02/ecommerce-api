import { User } from "../Models/User.js";
import bcrypt from "bcryptjs";

// user register
export const register = async (req, res) => {
  const { name, email, password } = req.body;

  let user = await User.findOne({ email });
  if (user) return res.json({ message: "User already exist", success: false });

  const hashPassword = await bcrypt.hash(password, 10);

  user = await User.create({
    name,
    email,
    password: hashPassword,
  });

  res.json({ message: "User Register Successfully...!",user, success: true });
};
