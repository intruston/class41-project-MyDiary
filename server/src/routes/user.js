import express from "express";
import {
  deleteUser,
  followUser,
  unfollowUser,
  getUser,
  updateUser,
  uploadPicture,
  getUserFriends,
} from "../controllers/user.js";
import { loginUser, signupUser } from "../controllers/auth.js";

const userRouter = express.Router();

userRouter.post("/signup", signupUser);
userRouter.post("/login", loginUser);
userRouter.put("/:id", updateUser);
userRouter.delete("/:id", deleteUser);
userRouter.get("/:id", getUser);
userRouter.put("/:id/follow", followUser);
userRouter.put("/:id/unfollow", unfollowUser);
userRouter.post("/upload/:id", uploadPicture);
userRouter.get("/friends/:userId", getUserFriends);

export default userRouter;
