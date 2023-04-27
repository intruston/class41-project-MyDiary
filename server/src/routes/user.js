import express from "express";
import {
  createUser,
  deleteUser,
  followUser,
  unfollowUser,
  getUser,
  login,
  updateUser,
  updateUserPassword,
  uploadPicture,
  getUserFriends,
} from "../controllers/user.js";

const userRouter = express.Router();

userRouter.post("/create", createUser);
userRouter.post("/login", login);
userRouter.put("/:id", updateUser);
userRouter.put("/password/:id", updateUserPassword);
userRouter.delete("/:id", deleteUser);
userRouter.get("/:id", getUser);
userRouter.put("/:id/follow", followUser);
userRouter.put("/:id/unfollow", unfollowUser);
userRouter.post("/upload/:id", uploadPicture);
userRouter.get("/friends/:userId", getUserFriends);

export default userRouter;
