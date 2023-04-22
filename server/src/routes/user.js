import express from "express";
import {
  createUser,
  deleteUser,
  followUser,
  unfollowUser,
  getAUser,
  getUsers,
  login,
  updateUser,
  upload,
} from "../controllers/user.js";

const userRouter = express.Router();

userRouter.get("/", getUsers);
userRouter.post("/create", createUser);
userRouter.post("/login", login);
userRouter.put("/:id", updateUser);
userRouter.delete("/:id", deleteUser);
userRouter.get("/:id", getAUser);
userRouter.put("/:id/follow", followUser);
userRouter.put("/:id/unfollow", unfollowUser);
userRouter.post("/upload/:id", upload);

export default userRouter;
