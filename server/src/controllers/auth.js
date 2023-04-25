import { logError } from "../util/logging.js";
import User, { validateUser } from "../models/User.js";
import validationErrorMessage from "../util/validationErrorMessage.js";
import { hashPassword, comparePassword } from "../util/password.js";

export const signupUser = async (req, res) => {
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

export const loginUser = async (req, res) => {
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
