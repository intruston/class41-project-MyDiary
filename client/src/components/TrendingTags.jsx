import React from "react";
import "./trendingTags.css";
import { Link } from "react-router-dom";
const TrendingTags = () => {
  const tags = ["downtown", "long", "bike", "say", "way"];

  return (
    <div className="tags-container">
      {tags.map((tag) => (
        <div key={tag} className="tags">
          <Link to={`/search/tags?q=${tag}`}>
            <p>{tag}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default TrendingTags;
