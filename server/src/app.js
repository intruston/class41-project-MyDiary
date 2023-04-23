import express from "express";
import cors from "cors";

import userRouter from "./routes/user.js";
import postRouter from "./routes/post.js";
import fileUpload from "express-fileupload";
// import { v2 as cloudinary } from "cloudinary";

// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.API_KEY,
//   api_secret: process.env.API_SECRET,
// });
// Create an express server
const app = express();

// Tell express to use the json middleware
app.use(express.json());
// Tell express to use the fileUpload middleware
app.use(fileUpload({ useTempFiles: true }));

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
