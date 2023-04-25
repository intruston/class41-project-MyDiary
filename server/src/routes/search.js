import express from "express";
import { searchTags } from "../controllers/search.js";

const searchRouter = express.Router();

searchRouter.get("/tags", searchTags);

export default searchRouter;
