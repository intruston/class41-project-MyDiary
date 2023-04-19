import express from "express";
import { createPost, getPosts } from "../controllers/post.js";

const postRouter = express.Router();

postRouter.get("/", getPosts);
postRouter.post("/create", createPost);

export default postRouter;
