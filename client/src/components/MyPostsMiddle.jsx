import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  useCallback,
} from "react";
import { useUserContext } from "../hooks/useUserContext";
import { useDateContext } from "../hooks/useDateContext";
import { usePostsContext } from "../hooks/usePostsContext";
import postBackground from "../assets/post-background.png";
import SinglePost from "./SinglePost";
import useFetch from "../hooks/useFetch";
import Loading from "./Loading";
import Modal from "./Modal";
import AddNewPost from "./AddNewPost";
import moment from "moment";
import noImage from "../assets/no-image.png";

const MyPostsMiddle = () => {
  const { user } = useUserContext();
  const { date } = useContext(useDateContext);
  const { posts, setPosts } = usePostsContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [modalActive, setModalActive] = useState(false);
  const [activeTab, setActiveTab] = useState("public");

  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    `/post/timeline/${user._id}?privacy=${activeTab}&date=${
      date ? date : ""
    }&limit=10&page=${currentPage}`,
    (response) => {
      setPosts((prevPosts) => [...prevPosts, ...response.result]);
      setHasNextPage(Boolean(response.result.length));
    }
  );

  useEffect(() => {
    setCurrentPage(1);
    setPosts([]);
  }, [activeTab, date]);

  useEffect(() => {
    if (currentPage !== 1) return;
    performFetch();
    return cancelFetch;
  }, [activeTab, date, currentPage]);

  useEffect(() => {
    if (posts.length < 10 || currentPage === 1) return;
    performFetch();
    return cancelFetch;
  }, [currentPage]);

  const handlePostsRefresh = () => {
    setCurrentPage(1);
    setPosts([]);
    performFetch();
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // using Intersection Observer for fetching new posts when we see the last post on the page
  const intObserver = useRef(null);
  const lastPostRef = useCallback(
    (post) => {
      if (isLoading) return;

      if (intObserver.current) intObserver.current.disconnect();
      intObserver.current = new IntersectionObserver((posts) => {
        if (posts[0].isIntersecting && hasNextPage) {
          setCurrentPage((prevPage) => prevPage + 1);
        }
      });

      if (post) intObserver.current.observe(post);
    },
    [isLoading, hasNextPage]
  );

  const filteredPosts = posts;

  return (
    <div className="middle-section">
      <Modal active={modalActive} setActive={setModalActive}>
        <AddNewPost
          setActive={setModalActive}
          handlePostsRefresh={handlePostsRefresh}
        />
      </Modal>
      <div className="middle-container">
        {/* Page Header */}
        <div className="page-header">
          <div className="left">
            <h2>My Diary</h2>
          </div>
          <div className="right">
            <h3>{user ? user.bio : ""}</h3>
          </div>
        </div>

        {/* Add New Post */}
        <div className="add-new-post has-loading">
          <img
            src={postBackground}
            alt="user background"
            onError={(e) => (e.target.src = noImage)}
          />
          <div className="post-button">
            <button onClick={() => setModalActive(true)}>+ Add Post</button>
          </div>
        </div>
        {error && <div className="error">{error.message || error}</div>}

        {/* Public - Private */}
        <div className="public-private">
          <h4
            className={activeTab === "public" ? "active-posts" : ""}
            onClick={() => handleTabClick("public")}
          >
            My public posts
          </h4>
          <h4 style={{ color: "darksalmon", fontSize: "1.2rem" }}>
            {date && " On " + moment(date).format("DD MMMM YYYY")}
          </h4>
          <h4
            className={activeTab === "private" ? "active-posts" : ""}
            onClick={() => handleTabClick("private")}
          >
            My private posts
          </h4>
        </div>
      </div>

      {/* POSTS */}
      {isLoading && (
        <div className="load-container">
          .
          <Loading />
        </div>
      )}
      <div>
        {filteredPosts.length > 0 ? (
          <>
            {filteredPosts.map((mappedPost, i) => (
              <div
                className="single-post has-loading"
                ref={filteredPosts.length === i + 1 ? lastPostRef : null}
                key={mappedPost._id}
              >
                <SinglePost mappedPost={mappedPost} />
              </div>
            ))}
          </>
        ) : !isLoading && !date ? (
          <div className="no-post has-loading">Lets start writing!</div>
        ) : (
          !isLoading && (
            <div className="no-post has-loading">
              You have no posts on this day, try to choose another.
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default MyPostsMiddle;
