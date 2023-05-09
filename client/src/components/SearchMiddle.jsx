/* eslint-disable no-console */
import React, { useState, useEffect } from "react";
import SinglePost from "./SinglePost";
import useFetch from "../hooks/useFetch";
import Loading from "./Loading";
import "./searchMiddle.css";
import SearchIcon from "@mui/icons-material/Search";
import { useParams } from "react-router-dom";
import MostLikedPosts from "./MostLikedPosts";

const SearchMiddle = () => {
  const { most } = useParams(); //comes from tags
  const sanitizeTags = (value) => {
    let sanitizedValue = value.trim(); // Remove leading and trailing spaces
    sanitizedValue = sanitizedValue.replace(/^[#\s]+/, ""); // Remove '#' symbols and spaces from the beginning
    return sanitizedValue;
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [searchedWord, setSeacrhedWord] = useState(null);
  const [searchResult, setSearchResult] = useState([]);
  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    `/search/tags?q=${searchQuery}`,
    (data) => {
      setSearchResult(data.result);
    }
  );

  useEffect(() => {
    if (most) {
      const sanitizedMost = sanitizeTags(most); // Remove '#' symbol from tags
      setSearchQuery((prevSearchQuery) => {
        // Update the searchQuery based on the previous state
        if (sanitizedMost !== prevSearchQuery) {
          return sanitizedMost;
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
    setSeacrhedWord(searchQuery);
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
          <button type="submit" className="search-search-button">
            <SearchIcon className="search-search-icon" />
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
          <>
            {searchedWord || most ? (
              <div className="found-no-result">
                No result for: <strong>{searchedWord || most}</strong>
              </div>
            ) : (
              ""
            )}
            <MostLikedPosts />
          </>
        )}
      </div>
    </div>
  );
};

export default SearchMiddle;
