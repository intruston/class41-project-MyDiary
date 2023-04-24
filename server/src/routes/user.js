import express from "express";
import {
  createUser,
  deleteUser,
  followUser,
  unfollowUser,
  getUser,
  getUsers,
  login,
  updateUser,
  uploadPicture,
  getOnlineFriends,
} from "../controllers/user.js";

const userRouter = express.Router();

userRouter.get("/", getUsers);
userRouter.post("/create", createUser);
userRouter.post("/login", login);
userRouter.put("/:id", updateUser);
userRouter.delete("/:id", deleteUser);
userRouter.get("/:id", getUser);
userRouter.put("/:id/follow", followUser);
userRouter.put("/:id/unfollow", unfollowUser);
userRouter.post("/upload/:id", uploadPicture);
userRouter.get("/friends/online/:userId", getOnlineFriends);

export default userRouter;
