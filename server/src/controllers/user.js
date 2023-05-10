import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import User from "../models/User.js";
import { logError } from "../util/logging.js";
import { comparePassword, hashPassword } from "../util/password.js";
import { authCheckId } from "./auth.js";

/** --- GET USER ---
 * @route GET /api/user/:id
 * @desc Get one user
 * @access Public
 * @requiresAuth
 */
export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).exec();

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

/** --- UPDATE USER ---
 * @route PUT /api/user/:id
 * @desc Update a user
 * @access Private
 * @requiresAuth
 */
export const updateUser = async (req, res) => {
  if (req.body._id !== req.params.id) {
    return res
      .status(403)
      .json({ success: false, msg: "You can update only your account!" });
  }
  try {
    const user = await User.findById(req.params.id).exec();
    const match = await comparePassword(req.body.password, user.password);

    if (match) {
      delete req.body.password;

      const user = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      ).exec();
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

/** --- UPDATE USER PASSWORD ---
 * @route PUT /api/user/password/:id
 * @desc Change password
 * @access Private
 * @requiresAuth
 */
export const updateUserPassword = async (req, res) => {
  if (req.body._id !== req.params.id) {
    return res
      .status(403)
      .json({ success: false, msg: "You can change only your password!" });
  }
  try {
    const user = await User.findById(req.params.id).exec();
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
      ).exec();
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

/** --- UPLOAD PROFILE PICTURE ---
 * @route POST /api/user/upload/:id
 * @desc Upload profile picture
 * @access Private
 * @requiresAuth
 */
export const uploadProfilePicture = async (req, res) => {
  try {
    const authUserId = authCheckId(req);
    if (authUserId !== req.params.id) {
      return res.status(403).json({
        success: false,
        msg: "You can upload only your own profile picture!",
      });
    }

    const user = await User.findById(req.params.id).exec();

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

/** --- DELETE USER ---
 * @route DELETE /api/user/:id
 * @desc Delete user
 * @access Private
 * @requiresAuth
 */
export const deleteUser = async (req, res) => {
  try {
    const authUserId = authCheckId(req);
    if (authUserId !== req.params.id) {
      return res
        .status(403)
        .json({ success: false, msg: "You can delete only your own profile!" });
    }

    // checks if the user exists in the database
    const user = await User.findById(req.params.id).exec();
    if (!user) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }

    // TODO: to let user delete profile uncomment
    // await Post.deleteMany({ userId: user._id }).exec();
    // await User.findByIdAndDelete(user._id).exec();

    res
      .status(200)
      .json({ success: true, msg: "User deleted PLEASE CHECK TODO" });
  } catch (err) {
    logError(err);
    res.status(500).json({ success: false, msg: err });
  }
};

/** --- FOLLOW USER ---
 * @route PUT /api/user/:id/follow
 * @desc Follow or unfollow user
 * @access Private
 * @requiresAuth
 */
export const followUser = async (req, res) => {
  try {
    // Get target User
    const targetUser = await User.findById(req.params.id).exec();
    // Get main user
    const currentUser = await User.findById(req.body._id).exec();
    if (targetUser._id === currentUser._id) {
      return res.status(403).json({
        success: false,
        msg: "You cannot follow or unfollow yourself!",
      });
    }

    // Check: If target id is already in following?
    if (currentUser.following.includes(targetUser._id)) {
      // remove target user from main user.Following
      await currentUser
        .updateOne({ $pull: { following: req.params.id } }, { new: true })
        .exec();
      // remove main user from target user.Followers
      await targetUser
        .updateOne({ $pull: { followers: req.body._id } }, { new: true })
        .exec();

      const updatedUser = await User.findById(req.body._id).exec();
      // Only sending Current User.following back to the Client
      res.status(200).json({ success: true, result: updatedUser.following });
    } else {
      // ELSE: If target id is not in following?

      await currentUser
        .updateOne(
          // add target user to main user.Following
          { $push: { following: req.params.id } },
          { new: true }
        )
        .exec();

      await targetUser
        .updateOne(
          // add main user to target user.followers
          { $push: { followers: req.body._id } },
          { new: true }
        )
        .exec();

      const updatedUser = await User.findById(req.body._id).exec();
      res.status(200).json({ success: true, result: updatedUser.following });
    }
  } catch (err) {
    res.status(500).json({ success: false, msg: err });
  }
};

/** --- GET USER FRIENDS ---
 * @route GET /api/user/friends/:userId
 * @desc Upload profile picture
 * @access Private
 * @requiresAuth
 */
export const getUserFriends = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).exec();
    // Find all following users and put them in friends.
    const friends = await Promise.all(
      user.following.map((friendId) => {
        return User.findById(friendId).exec();
      })
    );

    // Remove unnecessary parts of the users in friends.
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
