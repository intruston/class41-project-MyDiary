import React from "react";
import { icons } from "../assets/svg.js";

const AddNewPostImage = () => {
  return (
    <>
      <div className="new-post-bottom-middle">
        {/* {fethed.image && ( */}
        <div className="add-post-image">
          <img
            src="https://cdn.pixabay.com/photo/2022/03/09/14/11/cat-7057971_960_720.png"
            alt="post image"
            onError={(e) => (e.target.src = "")}
          ></img>
        </div>
        {/* )} */}
      </div>
      <div className="new-post attach" onClick={() => {}}>
        {" "}
        {icons.attach}
      </div>
    </>
  );
};

export default AddNewPostImage;
