import express from "express";
import cors from "cors";

import userRouter from "./routes/user.js";
import postRouter from "./routes/post.js";

// Create an express server
const app = express();

// Tell express to use the json middleware
app.use(express.json());
// Allow everyone to access our API. In a real application, we would need to restrict this!
app.use(cors());

/****** Attach routes ******/
/**
 * We use /api/ at the start of every route!
 * As we also host our client code on heroku we want to separate the API endpoints.
 * EXAMPLE OF API USER CREATE http://localhost:3000/api/user/create
 * EXAMPLE OF API GET ALL USERS http://localhost:3000/api/user
 * EXAMPLE OF API CREATE NEW POST http://localhost:3000/api/post/create
 * EXAMPLE OF API GET ALL POSTS http://localhost:3000/api/post
 */
app.use("/api/user", userRouter);
app.use("/api/post", postRouter);

export default app;
