import Post from "../models/Post.js";
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
          isBanned: false, // filter out banned posts
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
        $sort: { score: -1, createdAt: -1 },
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
export const mostPopularTags = async (req, res) => {
  try {
    const most = parseInt(req.params.most);
    const searchQuery = await Post.aggregate([
      // Match documents with non-empty tags array and isPrivate: false and isBanned: false
      {
        $match: {
          tags: { $exists: true, $ne: [] },
          isPrivate: false,
          isBanned: false,
        },
      },

      // Group documents by tag and count their occurrences
      { $unwind: "$tags" },
      { $group: { _id: "$tags", count: { $sum: 1 } } },

      // Sort documents by count in descending order
      { $sort: { count: -1 } },

      // Get the top N tags
      { $limit: most },

      // Project only the tag name
      { $project: { _id: 0, tag: "$_id" } },
    ]);
    const tags = searchQuery.map((item) => item.tag);
    res.status(200).json({ success: true, result: tags });
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      msg: `Unable to find posts, error: ${error}`,
    });
  }
};
