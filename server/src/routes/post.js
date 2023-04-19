import express from "express";
import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  likePost,
  updatePost,
} from "../controllers/post.js";

const postRouter = express.Router();

postRouter.get("/", getPosts); // get all posts //get timeline posts
postRouter.get("/:id", getPost); //get a post
postRouter.post("/create", createPost); // create a new post
postRouter.put("/:id", updatePost); // update a post
postRouter.delete("/:id", deletePost); //delete a post
postRouter.put("/:id/like", likePost); //like/dislike a post

export default postRouter;
