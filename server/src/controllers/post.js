import jwt from "jsonwebtoken";
import Post, { validatePost } from "../models/Post.js";
import User from "../models/User.js";
import { logError } from "../util/logging.js";
import validationErrorMessage from "../util/validationErrorMessage.js";

export const getTimeline = async (req, res) => {
  let timelinePosts = [];
  try {
    // Decode the token
    const { authorization } = req.headers;
    const token = authorization.split(" ")[1];
    // Access the user ID from the decoded payload
    const { _id } = jwt.verify(token, process.env.SECRET);
    if (req.params.id === _id) {
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

export const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json({
        success: true,
        msg: "The post has been updated",
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

export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (post.userId === req.body.userId) {
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
