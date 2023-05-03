import React, { useState, useEffect } from "react";
import SinglePost from "./SinglePost";
import useFetch from "../hooks/useFetch";
import Loading from "./Loading";
import "./searchMiddle.css";
import loop from "../assets/search.png";

const SearchMiddle = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    `/search/tags?q=${searchQuery}`,
    (data) => {
      setSearchResult(data.result);
    }
  );

  useEffect(() => {
    return cancelFetch;
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    performFetch();
  };

  return (
    <div className="middle-section">
      <div className="middle-container">
        <form onSubmit={handleSubmit} className="search-form">
          <input
            type="text"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            className="search-input"
          />
          {searchResult && searchResult.length > 0 && (
            <p className="search-results">
              {searchResult.length}{" "}
              {searchResult.length === 1 ? "result" : "results"}
            </p>
          )}
          <button type="submit" className="search-button">
            <img src={loop} alt="Search" />
          </button>
        </form>
      </div>
      {error && <p>Error: {error.message}</p>}
      {/* Posts */}
      <div className="middle-container-results">
        {searchResult &&
          searchResult
            .filter((mappedPost) => {
              return !mappedPost.isPrivate;
            })
            .map((mappedPost) => (
              <div className="single-post has-loading" key={mappedPost._id}>
                {isLoading && <Loading />}
                <SinglePost mappedPost={mappedPost} />
              </div>
            ))}
      </div>
    </div>
  );
};

export default SearchMiddle;
