import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.model.js";

const register = async (req, res) => {
  try {
    const { password, userName, role } = req.body;
    if (!userName) {
      return res.status(400).json({ message: "userName is required" });
    }
    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }
    if (!role) {
      return res.status(400).json({ message: "Role is required" });
    }
    const exist = await User.findOne({ userName: { $regex: new RegExp('^' + userName + '$', 'i') } });
    if (exist) {
      return res.status(400).json({ message: "userName already exists" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    req.body.password = hashPassword;
    const user = await User.create(req.body);
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "3d",
    });
    res.status(201).json({ user, token, status: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

const login = async (req, res) => {
  try {
    const { userName, password } = req.body;
    if (!userName) {
      return res.json({ message: "userName is required" });
    }
    if (!password) {
      return res.json({ message: "Password is required" });
    }
    const user = await User.findOne({ userName: { $regex: new RegExp('^' + userName + '$', 'i') } });
    if (!user) {
      return res.json({ message: "UserName not found!" });
    }
    if (password && user.password) {
      const compared = await bcrypt.compare(password, user.password);
      if (compared) {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
          expiresIn: "3d",
        });
        res.status(200).json({
          user,
          status: true,
          err: null,
          token,
        });
      } else {
        res.json({ message: "Incorrect password!" });
      }
    } else {
      res.json({ message: "Password is missing!" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

export { register, login };
