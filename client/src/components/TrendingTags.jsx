import React, { useState, useEffect } from "react";
import "./trendingTags.css";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Loading from "./Loading";
const TrendingTags = () => {
  const [popularTags, setPopularTags] = useState([]);
  const sanitizeTags = (value) => {
    let sanitizedValue = value.trim(); // Remove leading and trailing spaces
    sanitizedValue = sanitizedValue.replace(/^[#\s]+/, ""); // Remove '#' symbols and spaces from the beginning
    return sanitizedValue;
  };
  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    `/search/tags/${8}`,
    (data) => {
      setPopularTags(data.result);
    }
  );
  useEffect(() => {
    performFetch();
    return cancelFetch;
  }, []);

  useEffect(() => {}, [popularTags]);

  return (
    <>
      <h3 className="popular-tag-h3">Popular Tags</h3>
      <div className="tags-container">
        {error && <p>Error: {error.message}</p>}
        {popularTags.map((popularTag) => {
          return (
            <div key={popularTag} className="tags">
              {isLoading && <Loading />}
              <Link to={`/search/tags/${sanitizeTags(popularTag)}`}>
                <p>{sanitizeTags(popularTag)}</p>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default TrendingTags;
