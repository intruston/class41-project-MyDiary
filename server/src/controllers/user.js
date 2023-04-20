import bcrypt from "bcrypt";
import User, { validateUser } from "../models/User.js";
import { logError } from "../util/logging.js";
import validationErrorMessage from "../util/validationErrorMessage.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ success: true, result: users });
  } catch (error) {
    logError(error);
    res
      .status(500)
      .json({ success: false, msg: "Unable to get users, try again later" });
  }
};

export const createUser = async (req, res) => {
  try {
    const { user } = req.body;

    if (typeof user !== "object") {
      res.status(400).json({
        success: false,
        msg: `You need to provide a 'user' object. Received: ${JSON.stringify(
          user
        )}`,
      });

      return;
    }

    const errorList = validateUser(user);

    if (errorList.length > 0) {
      res
        .status(400)
        .json({ success: false, msg: validationErrorMessage(errorList) });
    } else {
      user.password = await hashPassword(user.password);
      const newUser = await User.create(user);

      res.status(201).json({ success: true, user: newUser });
    }
  } catch (error) {
    logError(error);
    res
      .status(500)
      .json({ success: false, msg: "Unable to create user, try again later" });
  }
};

export const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, msg: "login is not succeed" });
    }

    if (req.body.password) {
      try {
        const match = await comparePassword(req.body.password, user.password);
        if (!match) {
          return res.status(400).json({ success: false, msg: "Not Matched" });
        }
        return res.status(200).json({ success: true, result: user });
      } catch (err) {
        return res.status(500).json({ success: false, msg: err });
      }
    }
    return res.status(400).json({ success: false, msg: "Invalid Request" });
  } catch (err) {
    return res.status(500).json({ success: false, msg: err });
  }
};

export const updateUser = async (req, res) => {
  if (req.body._id === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        req.body.password = await hashPassword(req.body.password);
      } catch (err) {
        return res.status(500).json({ success: false, msg: err });
      }
    }
    try {
      const user = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json({ success: true, result: user });
    } catch (err) {
      return res.status(500).json({ success: false, msg: err });
    }
  } else {
    return res
      .status(403)
      .json({ success: false, msg: "You can update only your account!" });
  }
};

export const deleteUser = async (req, res) => {
  if (req.body._id === req.params.id || req.body.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json({ success: true, msg: "Account has been deleted" });
    } catch (err) {
      return res.status(500).json({ success: false, msg: err });
    }
  } else {
    return res
      .status(403)
      .json({ success: false, msg: "You can delete only your account!" });
  }
};

export const getAUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    res.status(200).json({ success: true, result: user });
  } catch (err) {
    res.status(500).json({ success: false, msg: err });
  }
};

// generating hashed password by bcrypt
async function hashPassword(password) {
  const hash = await bcrypt.hash(password, 10);
  return hash;
}
// compere plain text Password and encrypted password from Mongo
async function comparePassword(plaintextPassword, hash) {
  const result = await bcrypt.compare(plaintextPassword, hash);
  return result;
}
