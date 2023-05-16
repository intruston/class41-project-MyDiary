import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import Post, { validatePost } from "../models/Post.js";
import User from "../models/User.js";
import { logError } from "../util/logging.js";
import validationErrorMessage from "../util/validationErrorMessage.js";
import { authCheckId } from "./auth.js";

export const getTimeline = async (req, res) => {
  const page = parseInt(req.query.page);
  const postsPerPage = parseInt(req.query.limit);
  const startIndex = (page - 1) * postsPerPage;
  const endIndex = page * postsPerPage - startIndex;
  const privacy = req.query.privacy;

  let timelinePosts = [];
  try {
    const authUserId = authCheckId(req);
    if (authUserId === req.params.id && privacy === "private") {
      timelinePosts = await Post.find({
        userId: req.params.id,
        isPrivate: true,
      })
        .sort({ createdAt: -1 })
        .skip(startIndex)
        .limit(endIndex)
        .exec();
    } else {
      timelinePosts = await Post.find({
        userId: req.params.id,
        isPrivate: false,
        isBanned: false,
      })
        .sort({ createdAt: -1 })
        .skip(startIndex)
        .limit(endIndex)
        .exec();
    }
    console.log("privacy " + privacy, "page " + page);
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
  const page = parseInt(req.query.page);
  const postsPerPage = parseInt(req.query.limit);
  const startIndex = (page - 1) * postsPerPage;
  const endIndex = page * postsPerPage - startIndex;
  const sort = req.query.sort;

  try {
    const authUserId = authCheckId(req);

    if (authUserId !== req.params.id) {
      return res.status(404).json({
        success: false,
        msg: "User feed not found",
      });
    }

    const currentUser = await User.findById(req.params.id).exec();
    const userFriendsId = currentUser.following;
    const usersForFeed = [...userFriendsId, currentUser._id.toString()];

    const feedPosts =
      sort === "likes"
        ? await Post.aggregate([
            {
              $match: {
                userId: { $in: usersForFeed },
                isPrivate: false,
                isBanned: false,
              },
            },
            {
              $addFields: {
                likesLength: {
                  $size: "$likes",
                },
              },
            },
            {
              $sort: { likesLength: -1 },
            },
          ])
            .skip(startIndex)
            .limit(endIndex)
        : await Post.find({
            userId: { $in: usersForFeed },
            isPrivate: false,
            isBanned: false,
          })
            .sort({ createdAt: -1 })
            .skip(startIndex)
            .limit(endIndex)
            .exec();

    res.status(200).json({
      success: true,
      result: feedPosts,
    });
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
    const post = await Post.findById(req.params.id).exec();
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

    // Split tags by space
    if (typeof post.tags === "string") {
      post.tags = post.tags.split(" ");
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
    const post = await Post.findById(req.params.id).exec();

    if (post.userId === authUserId) {
      // Delete image from Cloudinary
      if (post.image) {
        const urlArr = post.image.split("/");
        const imageFolder = urlArr[urlArr.length - 2];
        const imageName = urlArr[urlArr.length - 1].split(".")[0];
        const imagePath = `Diary/post_images/${imageFolder}/${imageName}`;

        cloudinary.config({
          cloud_name: process.env.CLOUD_NAME,
          api_key: process.env.API_KEY,
          api_secret: process.env.API_SECRET,
        });

        const imageResult = await cloudinary.uploader.destroy(imagePath);
        if (imageResult.result !== "ok") {
          res.status(400).json({
            success: false,
            msg: `Cannot delete image on Cloudinary: ${JSON.stringify(
              imageResult
            )}`,
          });
          return;
        }
      }

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
    const post = await Post.findById(req.params.id).exec();

    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
    }

    const updatedPost = await Post.findById(req.params.id).exec();

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
          folder: `Diary/post_images/${req.params.id}`,
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

    const post = await Post.findById(req.params.id).exec();
    const user = await User.findById(authUserId).exec();

    if (post.userId === authUserId || user.isModerator || req.body.isReported) {
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

// Moderator routes
export const getReportedPosts = async (req, res) => {
  const page = parseInt(req.query.page);
  const postsPerPage = parseInt(req.query.limit);
  const startIndex = (page - 1) * postsPerPage;
  const endIndex = page * postsPerPage - startIndex;

  try {
    const authUserId = authCheckId(req);
    const currentUser = await User.findById(req.params.id).exec();
    const userId = currentUser._id.toString();

    // Compare that user is real and moderator rights
    if (userId === authUserId && currentUser.isModerator) {
      const reportedPosts = await Post.find({
        $and: [{ isBanned: false }, { isReported: true }],
      })
        .sort({ createdAt: -1 })
        .skip(startIndex)
        .limit(endIndex)
        .exec();

      res.status(200).json({ success: true, result: reportedPosts });
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
      msg: `Unable to get reported posts, error: ${error}`,
    });
  }
};

export const getBannedPosts = async (req, res) => {
  const page = parseInt(req.query.page);
  const postsPerPage = parseInt(req.query.limit);
  const startIndex = (page - 1) * postsPerPage;
  const endIndex = page * postsPerPage - startIndex;

  try {
    const authUserId = authCheckId(req);
    const currentUser = await User.findById(req.params.id).exec();
    const userId = currentUser._id.toString();

    // Compare that user is real and moderator rights
    if (userId === authUserId && currentUser.isModerator) {
      const bannedPosts = await Post.find({ isBanned: true })
        .sort({ createdAt: -1 })
        .skip(startIndex)
        .limit(endIndex)
        .exec();

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
      msg: `Unable to get banned posts, error: ${error}`,
    });
  }
};
