import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SinglePost from "./SinglePost";
import SearchIcon from "@mui/icons-material/Search";
import useFetch from "../hooks/useFetch";
import Loading from "./Loading";
import "./searchMiddle.css";
import MostLikedPosts from "./MostLikedPosts";
import { sanitizeTags } from "../util/sanitizeTags";

const SearchMiddle = () => {
  const { most } = useParams(); //comes from tags
  const [searchQuery, setSearchQuery] = useState("");
  const [searchedWord, setSearchedWord] = useState(null);
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
    setSearchedWord(searchQuery);
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
      {isLoading && (
        <div className="load-container">
          <Loading />
        </div>
      )}
      {error && (
        <div className="error">
          {typeof error === "string"
            ? error
            : "Error happened. Refresh the page"}
        </div>
      )}
      {/* Posts */}
      <div className="middle-container-results">
        {searchResult.length ? (
          searchResult
            .filter((mappedPost) => {
              return !mappedPost.isPrivate && !mappedPost.isBanned;
            })
            .map((mappedPost) => (
              <div className="single-post" key={mappedPost._id}>
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
