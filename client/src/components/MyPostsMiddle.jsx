import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  useCallback,
} from "react";
import postBackground from "../assets/post-background.png";
import SinglePost from "./SinglePost";
import useFetch from "../hooks/useFetch";
import Loading from "./Loading";
import { useUserContext } from "../hooks/useUserContext";
import { useDateContext } from "../hooks/useDateContext";
import Modal from "./Modal";
import AddNewPost from "./AddNewPost";
import moment from "moment";
import noImage from "../assets/no-image.png";
import { usePostsContext } from "../hooks/usePostsContext";

const MyPostsMiddle = () => {
  const { user } = useUserContext();
  const { date } = useContext(useDateContext);
  const { posts, setPosts } = usePostsContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [modalActive, setModalActive] = useState(false);
  const [activeTab, setActiveTab] = useState("public");
  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    `/post/timeline/${user._id}?privacy=${activeTab}&limit=10&page=${currentPage}`,
    (response) => {
      setPosts((prevPosts) => [...prevPosts, ...response.result]);
      setHasNextPage(Boolean(response.result.length));
    }
  );

  useEffect(() => {
    setCurrentPage(1);
    setPosts([]);
  }, [activeTab]);

  useEffect(() => {
    if (currentPage !== 1) return;
    performFetch();
    return cancelFetch;
  }, [activeTab, currentPage]);

  useEffect(() => {
    if (posts.length < 10 || currentPage === 1) return;
    performFetch();
    return cancelFetch;
  }, [currentPage]);

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

  // Dates filter
  const filteredPosts =
    posts &&
    posts.filter((mappedPost) => {
      const postDate = moment(mappedPost.createdAt).format("YYYY-MM-DD");
      const isPostOnDate = !date || postDate === date;

      if (isPostOnDate) {
        return true;
      }

      return false;
    });

  return (
    <div className="middle-section">
      <Modal active={modalActive} setActive={setModalActive}>
        <AddNewPost setActive={setModalActive} />
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
          <h4>{date && " at " + date}</h4>
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
        ) : (
          !isLoading && (
            <div className="no-post has-loading">Lets start writing</div>
          )
        )}
      </div>
    </div>
  );
};

export default MyPostsMiddle;
