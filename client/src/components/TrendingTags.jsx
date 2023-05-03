import React, { useState, useEffect } from "react";
import "./trendingTags.css";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Loading from "./Loading";
const TrendingTags = () => {
  const [popularTags, setPopularTags] = useState([]);
  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    `/search/tags/${10}`,
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
    <div className="tags-container">
      {error && <p>Error: {error.message}</p>}
      {popularTags.map((popularTag) => {
        return (
          <div key={popularTag} className="tags">
            {isLoading && <Loading />}
            <Link to={`/search/tags?q=${popularTag}`}>
              <p>{popularTag}</p>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default TrendingTags;
