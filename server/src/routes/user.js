import express from "express";
import {
  deleteUser,
  followUser,
  unfollowUser,
  getUser,
  updateUser,
  updateUserPassword,
  uploadPicture,
  getUserFriends,
} from "../controllers/user.js";
import { loginUser, signupUser } from "../controllers/auth.js";
import requireAuth from "../middleware/requireAuth.js";

const userRouter = express.Router();

userRouter.post("/signup", signupUser);
userRouter.post("/login", loginUser);

// require authorization for all the protected routes
userRouter.use(requireAuth);

userRouter.put("/:id", updateUser);
userRouter.put("/password/:id", updateUserPassword);
userRouter.delete("/:id", deleteUser);
userRouter.get("/:id", getUser);
userRouter.put("/:id/follow", followUser);
userRouter.put("/:id/unfollow", unfollowUser);
userRouter.post("/upload/:id", uploadPicture);
userRouter.get("/friends/:userId", getUserFriends);

export default userRouter;
