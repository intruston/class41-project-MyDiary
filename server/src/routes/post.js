import express from "express";
import {
  createPost,
  deletePost,
  getBannedPosts,
  getFeed,
  getPost,
  getTimeline,
  likePost,
  updatePost,
  uploadPostPicture,
} from "../controllers/post.js";

const postRouter = express.Router();
import requireAuth from "../middleware/requireAuth.js";

// require authorization for all the protected routes
postRouter.use(requireAuth);

postRouter.get("/feed/:id", getFeed); // get friends feed and my public posts sorted by date
postRouter.get("/timeline/:id", getTimeline); // get all my posts
postRouter.get("/:id", getPost); //get a post
postRouter.post("/create", createPost); // create a new post
postRouter.post("/upload/:id", uploadPostPicture); // add a post picture to cloudinary
postRouter.put("/:id", updatePost); // update a post
postRouter.delete("/:id", deletePost); //delete a post
postRouter.put("/:id/like", likePost); //like/dislike a post
postRouter.get("/moderation/:id", getBannedPosts); // banned posts for moderator page

export default postRouter;
