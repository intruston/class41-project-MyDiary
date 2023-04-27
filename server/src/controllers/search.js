import Post from "../models/Post.js";
//import User from "../models/User.js";
import { logError } from "../util/logging.js";

export const searchTags = async (req, res) => {
  // search through tags
  try {
    const query = req.query.q;
    const terms = query.split(" ").map((term) => new RegExp(term.trim(), "i"));
    const searchQuery = await Post.aggregate([
      {
        $match: {
          tags: { $in: terms },
          isPrivate: false, // filter out private posts
        },
      },
      {
        $addFields: {
          score: {
            $size: {
              $setIntersection: [terms, "$tags"],
            },
          },
        },
      },
      {
        $sort: { score: -1 },
      },
    ]);

    res.status(200).json({ success: true, result: searchQuery });
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      msg: `Unable to find posts, error: ${error}`,
    });
  }
};
