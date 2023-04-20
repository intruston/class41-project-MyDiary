import express from "express";
import {
  createUser,
  deleteUser,
  getAUser,
  getUsers,
  login,
  updateUser,
} from "../controllers/user.js";

const userRouter = express.Router();

userRouter.get("/", getUsers);
userRouter.post("/create", createUser);
userRouter.post("/login", login);
userRouter.put("/:id", updateUser);
userRouter.delete("/:id", deleteUser);
userRouter.get("/:id", getAUser);

export default userRouter;
