import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import User, { validateUser } from "../models/User.js";
import { logError } from "../util/logging.js";
import { comparePassword, hashPassword } from "../util/password.js";
import { authCheckId } from "./auth.js";

export const updateUser = async (req, res) => {
  if (req.body._id !== req.params.id) {
    return res
      .status(403)
      .json({ success: false, msg: "You can update only your account!" });
  }
  try {
    const user = await User.findById(req.params.id);
    const match = await comparePassword(req.body.password, user.password);

    if (match) {
      delete req.body.password;

      const user = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json({ success: true, result: user });
    } else {
      return res
        .status(404)
        .json({ success: false, msg: "User not updated. Wrong password!" });
    }
  } catch (err) {
    logError(err);
    res.status(500).json({ success: false, msg: err });
  }
};

export const updateUserPassword = async (req, res) => {
  if (req.body._id !== req.params.id) {
    return res
      .status(403)
      .json({ success: false, msg: "You can change only your password!" });
  }
  try {
    const user = await User.findById(req.params.id);
    const match = await comparePassword(req.body.password, user.password);

    if (match) {
      req.body.password = await hashPassword(req.body.newPassword);
      delete req.body.newPassword;

      const user = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json({ success: true, result: user });
    } else {
      return res
        .status(404)
        .json({ success: false, msg: "Password not changed. Wrong password!" });
    }
  } catch (err) {
    logError(err);
    res.status(500).json({ success: false, msg: err });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const authUserId = authCheckId(req);
    if (authUserId !== req.params.id) {
      return res
        .status(403)
        .json({ success: false, msg: "You can delete only your own profile!" });
    }

    // checks if the user exists in the database
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }

    // TODO: to let user delete profile uncomment
    // await Post.deleteMany({ userId: user._id });
    // await User.findByIdAndDelete(user._id);

    res
      .status(200)
      .json({ success: true, msg: "User deleted PLEASE CHECK TODO" });
  } catch (err) {
    logError(err);
    res.status(500).json({ success: false, msg: err });
  }
};

export const followUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const currentUser = await User.findById(req.body._id);

    if (req.params.id === req.body._id) {
      return res.status(403).json({
        success: false,
        msg: "You cannot follow or unfollow yourself!",
      });
    }

    if (user.followers.includes(req.body._id)) {
      await user.updateOne(
        { $pull: { followers: req.body._id } },
        { new: true }
      );
      await currentUser.updateOne(
        { $pull: { following: req.params.id } },
        { new: true }
      );
      const updatedUser = await User.findById(req.body._id);
      res.status(200).json({ success: true, result: updatedUser.following });
    } else {
      await user.updateOne(
        { $push: { followers: req.body._id } },
        { new: true }
      );
      await currentUser.updateOne(
        { $push: { following: req.params.id } },
        { new: true }
      );
      const updatedUser = await User.findById(req.body._id);
      res.status(200).json({ success: true, result: updatedUser.following });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    const {
      _id,
      email,
      firstName,
      lastName,
      profilePicture,
      birthday,
      country,
      bio,
      isModerator,
      following,
    } = user;
    const userInfo = {
      _id,
      email,
      firstName,
      lastName,
      profilePicture,
      birthday,
      country,
      bio,
      isModerator,
      following,
    };

    res.status(200).json({ success: true, result: userInfo });
  } catch (err) {
    res.status(500).json({ success: false, msg: err });
  }
};

export const uploadProfilePicture = async (req, res) => {
  try {
    const authUserId = authCheckId(req);
    if (authUserId !== req.params.id) {
      return res.status(403).json({
        success: false,
        msg: "You can upload only your own profile picture!",
      });
    }

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

export const getUserFriends = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const friends = await Promise.all(
      user.following.map((friendId) => {
        return User.findById(friendId);
      })
    );

    const userFriends = friends.map((friend) => {
      const { _id, firstName, lastName, profilePicture, bio } = friend;
      return { _id, firstName, lastName, profilePicture, bio };
    });

    res.status(200).json({ success: true, result: userFriends });
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      msg: "Unable to get friends list, try again later",
    });
  }
};

export const createUser = async (req, res) => {
  try {
    const { email, password, firstName, lastName, birthday, country, bio } =
      req.body;
    const user = {
      email,
      password,
      firstName,
      lastName,
      birthday,
      country,
      bio,
    };
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
        .json({ success: false, msg: "Something wrong with JSON" });
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
