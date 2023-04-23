import React, { useContext, useState, useEffect } from "react";
import AddNewPosts from "../../components/AddNewPost";
import PageHeader from "../../components/PageHeader";
import Posts from "../../components/Posts";
import useFetch from "../../hooks/useFetch";
import Loading from "../../components/Loading";
import { UserContext } from "../../hooks/useUserContext";

const Middle = () => {
  const { user } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    `/post/timeline/${user._id}`,
    (response) => {
      setPosts(response.result);
    }
  );
  useEffect(() => {
    performFetch();
    return cancelFetch;
  }, []);

  useEffect(() => {}, [posts]);
  return (
    <div className="middle-section">
      <div className="middle-container">
        <PageHeader postCount={posts && posts.length} />
        <AddNewPosts />
        <Posts posts={posts} />
        {isLoading && <Loading />}
        {error && (
          <div className="error">
            {error.toString()}
            {user}
          </div>
        )}
      </div>
    </div>
  );
};

export default Middle;
