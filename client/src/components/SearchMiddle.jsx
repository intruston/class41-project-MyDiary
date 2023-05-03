/* eslint-disable no-console */
import React, { useState, useEffect } from "react";
import SinglePost from "./SinglePost";
import useFetch from "../hooks/useFetch";
import Loading from "./Loading";
import "./searchMiddle.css";
import loop from "../assets/search.png";
import { useParams } from "react-router-dom";

const SearchMiddle = () => {
  const { most } = useParams();

  // eslint-disable-next-line no-console
  console.log("first-->" + most);
  const [searchQuery, setSearchQuery] = useState(most ? most : "");
  const [searchResult, setSearchResult] = useState([]);
  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    `/search/tags?q=${searchQuery}`,
    (data) => {
      setSearchResult(data.result);
      console.log("here 4--->" + most);
      console.log("here 4 Q--->" + searchQuery);
      console.table(searchResult);
    }
  );
  useEffect(() => {
    if (most) {
      console.log("here 3--->" + most);
      console.log("here 3 Q--->" + searchQuery);
      //setSearchQuery(most);
      performFetch();
    }

    return cancelFetch;
  }, [most]);
  useEffect(() => {
    if (most) {
      console.log("here 2 --->" + most);
      setSearchQuery(most);
      console.log("here 2 Q--->" + searchQuery);
    }
  }, [most]);

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
          <button type="submit">
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
