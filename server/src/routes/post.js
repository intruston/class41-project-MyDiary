import express from "express";
import {
  createPost,
  deletePost,
  getFeed,
  getPost,
  getTimeline,
  likePost,
  updatePost,
} from "../controllers/post.js";

const postRouter = express.Router();

postRouter.get("/feed/:id", getFeed); // get friends feed and my posts sorted by date
postRouter.get("/timeline/:id", getTimeline); // get all my posts
postRouter.get("/:id", getPost); //get a post
postRouter.post("/create", createPost); // create a new post
postRouter.put("/:id", updatePost); // update a post
postRouter.delete("/:id", deletePost); //delete a post
postRouter.put("/:id/like", likePost); //like/dislike a post

export default postRouter;
