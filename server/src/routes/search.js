import express from "express";
import { searchTags, mostPopularTags } from "../controllers/search.js";

const searchRouter = express.Router();

searchRouter.get("/tags", searchTags);
searchRouter.get("/tags/:most", mostPopularTags);

export default searchRouter;
