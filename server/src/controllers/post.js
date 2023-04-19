import Post, { validatePost } from "../models/Post.js";
import { logError } from "../util/logging.js";
import validationErrorMessage from "../util/validationErrorMessage.js";

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json({ success: true, result: posts });
  } catch (error) {
    logError(error);
    res
      .status(500)
      .json({ success: false, msg: "Unable to get posts, try again later" });
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
