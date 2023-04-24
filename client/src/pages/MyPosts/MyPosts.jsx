import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import MyPostsMiddle from "../../components/MyPostsMiddle";
import MyPostsRight from "../../components/MyPostsRight";
import "./MyPosts.css";
import Modal from "../../components/Modal";
import AddNewPost from "../../components/AddNewPost";
const MyPosts = () => {
  const [modalActive, setModalActive] = useState(false);
  return (
    <div className="page-container">
      {/* active must be same with navbar name of the page */}
      <Navbar active={"My diary"} />
      <MyPostsMiddle setActive={setModalActive} />
      <MyPostsRight />
      <Modal active={modalActive} setActive={setModalActive}>
        <AddNewPost setActive={setModalActive} />
      </Modal>
    </div>
  );
};

export default MyPosts;
