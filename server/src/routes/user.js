import express from "express";
import {
  deleteUser,
  followUser,
  getUser,
  updateUser,
  updateUserPassword,
  uploadProfilePicture,
  getUserFriends,
  createUser,
} from "../controllers/user.js";
import { loginUser, signupUser } from "../controllers/auth.js";
import requireAuth from "../middleware/requireAuth.js";

const userRouter = express.Router();

userRouter.post("/signup", signupUser);
userRouter.post("/login", loginUser);
userRouter.post("/create", createUser);

// require authorization for all the protected routes
userRouter.use(requireAuth);

userRouter.put("/:id", updateUser);
userRouter.put("/password/:id", updateUserPassword);
userRouter.delete("/:id", deleteUser);
userRouter.get("/:id", getUser);
userRouter.put("/:id/follow", followUser);
userRouter.post("/upload/:id", uploadProfilePicture);
userRouter.get("/friends/:userId", getUserFriends);

export default userRouter;
