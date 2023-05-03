import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import Post, { validatePost } from "../models/Post.js";
import User from "../models/User.js";
import { logError } from "../util/logging.js";
import validationErrorMessage from "../util/validationErrorMessage.js";
import { authCheckId } from "./auth.js";

export const getTimeline = async (req, res) => {
  let timelinePosts = [];
  try {
    const authUserId = authCheckId(req);
    if (authUserId === req.params.id) {
      timelinePosts = await Post.find({ userId: req.params.id });
    } else {
      timelinePosts = await Post.find({
        userId: req.params.id,
        isPrivate: false,
        isBanned: false,
      });
    }

    timelinePosts.sort((post1, post2) => {
      return new Date(post2.createdAt) - new Date(post1.createdAt);
    });

    res.status(200).json({ success: true, result: timelinePosts });
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      msg: `Unable to get timeline posts, error: ${error}`,
    });
  }
};

export const getFeed = async (req, res) => {
  try {
    const authUserId = authCheckId(req);

    if (authUserId !== req.params.id) {
      return res.status(404).json({
        success: false,
        msg: "User feed not found",
      });
    }
    const currentUser = await User.findById(req.params.id);
    const userPosts = await Post.find({ userId: currentUser._id });
    const friendsPosts = await Promise.all(
      currentUser.following.map((friendId) => {
        return Post.find({
          userId: friendId,
          isPrivate: false,
          isBanned: false,
        });
      })
    );

    const feedPosts = userPosts.concat(...friendsPosts).sort((post1, post2) => {
      return new Date(post2.createdAt) - new Date(post1.createdAt);
    });

    res.status(200).json({ success: true, result: feedPosts });
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      msg: `Unable to get feed posts, error: ${error}`,
    });
  }
};

export const getBannedPosts = async (req, res) => {
  try {
    const authUserId = authCheckId(req);

    const currentUser = await User.findById(req.params.id);
    const userId = currentUser._id.toString();

    // Compare that user is real and moderator rights
    if (userId === authUserId && currentUser.isModerator) {
      const bannedPosts = await Post.find({
        isBanned: true,
      });
      bannedPosts.sort((post1, post2) => {
        return new Date(post2.createdAt) - new Date(post1.createdAt);
      });

      res.status(200).json({ success: true, result: bannedPosts });
    } else {
      return res.status(403).json({
        success: false,
        msg: "You do not have moderation permission!",
      });
    }
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      msg: `Unable to get feed posts, error: ${error}`,
    });
  }
};

export const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json({ success: true, result: post });
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      msg: `Unable to get post with id: ${req.params.id}`,
    });
  }
};

export const createPost = async (req, res) => {
  try {
    const { post } = req.body;

    if (typeof post !== "object") {
      res.status(400).json({
        success: false,
        msg: `You need to provide a 'post' object. Received: ${JSON.stringify(
          post
        )}`,
      });

      return;
    }

    const errorList = validatePost(post);

    if (errorList.length > 0) {
      res
        .status(400)
        .json({ success: false, msg: validationErrorMessage(errorList) });
    } else {
      const newPost = await Post.create(post);

      res.status(201).json({ success: true, post: newPost });
    }
  } catch (error) {
    logError(error);
    res
      .status(500)
      .json({ success: false, msg: "Unable to create post, try again later" });
  }
};

export const deletePost = async (req, res) => {
  try {
    const authUserId = authCheckId(req);

    // Compare that user deleted only his post
    const post = await Post.findById(req.params.id);

    if (post.userId === authUserId) {
      await post.deleteOne();
      res.status(200).json({
        success: true,
        msg: "The post has been deleted",
      });
    } else {
      res
        .status(403)
        .json({ success: false, msg: "You can delete only your post" });
    }
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      msg: "Unable to delete post. Error: " + error,
    });
  }
};

export const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
    }

    const updatedPost = await Post.findById(req.params.id);

    res.status(200).json({
      success: true,
      msg: `The post has been ${
        post.likes.includes(req.body.userId) ? "disliked" : "liked"
      }`,
      result: updatedPost.likes,
    });
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      msg: "Unable to like/dislike post. Error: " + error,
    });
  }
};

export const uploadPostPicture = async (req, res) => {
  try {
    // const post = await Post.findById(req.params.id);
    // checks will be done later if needed
    // const authUserId = authCheckId(req);
    // if (req.body.userId !== authUserId) {
    // return res.status(403).json({
    //   success: false,
    //   msg: "You can upload picture only in your post!",
    // });
    // }

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
          folder: `Diary/post_images/${req.params.userId}`,
        }
      );
      //delete file from temp
      fs.unlinkSync(req.files.file.tempFilePath);

      const imageUrl = result.secure_url;
      res.status(200).json({ success: true, result: imageUrl });
    } else {
      res.status(404).json({ success: false, msg: "Image not found" });
    }
  } catch (err) {
    logError(err);
    res.status(500).json({ success: false, msg: err });
  }
};

export const updatePost = async (req, res) => {
  try {
    const authUserId = authCheckId(req);

    const post = await Post.findById(req.params.id);
    const user = await User.findById(authUserId);

    if (post.userId === authUserId || user.isModerator) {
      const post = await Post.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json({
        success: true,
        result: post,
      });
    } else {
      res
        .status(403)
        .json({ success: false, msg: "You can update only your post" });
    }
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      msg: "Unable to update post. Error: " + error,
    });
  }
};
