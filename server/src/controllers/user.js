import bcrypt from "bcrypt";
import User, { validateUser } from "../models/User.js";
import { logError } from "../util/logging.js";
import validationErrorMessage from "../util/validationErrorMessage.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// get all users we don't need it later just keep for now
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

//maybe this option only for admins and for users only isActive or not
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

export const followUser = async (req, res) => {
  if (req.body._id !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body._id);
      if (!user.followers.includes(req.body._id)) {
        await user.updateOne({ $push: { followers: req.body._id } });
        await currentUser.updateOne({ $push: { following: req.params.id } });
        const updatedUser = await User.findById(req.params.id);
        res.status(200).json({ success: true, result: updatedUser });
      } else {
        res
          .status(403)
          .json({ success: false, msg: "You already follow this user!" });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res
      .status(403)
      .json({ success: false, msg: "you can not follow yourself!" });
  }
};

export const unfollowUser = async (req, res) => {
  if (req.body._id !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body._id);
      if (user.followers.includes(req.body._id)) {
        await user.updateOne({ $pull: { followers: req.body._id } });
        await currentUser.updateOne({ $pull: { following: req.params.id } });
        const updatedUser = await User.findById(req.params.id);
        res.status(200).json({ success: true, result: updatedUser });
      } else {
        res
          .status(403)
          .json({ success: false, msg: "You do not follow this user!" });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res
      .status(403)
      .json({ success: false, msg: "you can not unfollow yourself!" });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    res.status(200).json({ success: true, result: user });
  } catch (err) {
    res.status(500).json({ success: false, msg: err });
  }
};
export const uploadPicture = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }

    // Upload image to Cloudinary
    if (req.files) {
      cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET,
      });
      const result = await cloudinary.uploader.upload(
        req.files.file.tempFilePath,
        {
          use_filename: true,
          folder: "Diary/profile_pictures/" + user._id,
        }
      );
      //delete file from temp
      fs.unlinkSync(req.files.file.tempFilePath);

      // Update profilePicture field for user
      user.profilePicture = result.secure_url;

      // Save changes to user document
      await user.save();

      res.status(200).json({ success: true, result: user.profilePicture });
    } else {
      res.status(404).json({ success: false, msg: "Picture not found" });
    }
  } catch (err) {
    logError(err);
    res.status(500).json({ success: false, msg: err });
  }
};

export const getOnlineFriends = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const friends = await Promise.all(
      user.following.map((friendId) => {
        return User.findById(friendId);
      })
    );

    let onlineFriends = [];

    friends.map((friend) => {
      if (friend.onlineStatus) {
        const { _id, firstName, lastName, profilePicture } = friend;
        onlineFriends.push({ _id, firstName, lastName, profilePicture });
      }
    });

    res.status(200).json({ success: true, result: onlineFriends });
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      msg: "Unable to get online friends, try again later",
    });
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
