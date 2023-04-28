import User from "../models/User.js";
import jwt from "jsonwebtoken";

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

export const signupUser = async (req, res) => {
  const { user } = req.body;
  try {
    const newUser = await User.signup(user);
    // create token
    const token = createToken(newUser._id);

    res.status(201).json({ email: user.email, id: newUser._id, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    // create token
    const token = createToken(user._id);

    res.status(200).json({ email, id: user._id, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
