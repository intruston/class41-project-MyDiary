/* eslint-disable no-console */
import React, { useState, useEffect } from "react";
import SinglePost from "./SinglePost";
import useFetch from "../hooks/useFetch";
import Loading from "./Loading";
import "./searchMiddle.css";
import loop from "../assets/search.png";
import { useParams } from "react-router-dom";
import MostLikedPosts from "./MostLikedPosts";

const SearchMiddle = () => {
  const { most } = useParams(); //comes from tags
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    `/search/tags?q=${searchQuery}`,
    (data) => {
      setSearchResult(data.result);
    }
  );

  useEffect(() => {
    if (most) {
      setSearchQuery((prevSearchQuery) => {
        // Update the searchQuery based on the previous state
        if (most !== prevSearchQuery) {
          return most;
        }
        return prevSearchQuery;
      });
    }
  }, [most]);

  useEffect(() => {
    if (most === searchQuery) {
      performFetch();
    }

    return cancelFetch;
  }, [most, searchQuery]);

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
            minLength={2}
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

          <button type="submit">
            <img src={loop} alt="Search" />
          </button>
        </form>
      </div>
      {error && <p>Error: {error.message}</p>}
      {/* Posts */}
      <div className="middle-container-results">
        {searchResult.length ? (
          searchResult
            .filter((mappedPost) => {
              return !mappedPost.isPrivate && !mappedPost.isBanned;
            })
            .map((mappedPost) => (
              <div className="single-post has-loading" key={mappedPost._id}>
                {isLoading && <Loading />}
                <SinglePost
                  mappedPost={mappedPost}
                  refreshUsers={performFetch}
                />
              </div>
            ))
        ) : (
          <MostLikedPosts />
        )}
      </div>
    </div>
  );
};

export default SearchMiddle;
