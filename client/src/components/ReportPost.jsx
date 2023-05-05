import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useUserContext } from "../hooks/useUserContext";
import useFetch from "../hooks/useFetch";

const ReportPost = ({ post, refreshUsers }) => {
  const { user } = useUserContext();
  const [reportState, setReportState] = useState(post.isReported);

  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    `/post/${post._id}`,
    (response) => {
      if (response.success) {
        setReportState(response.result.isReported);
        refreshUsers();
      } else {
        alert(response.msg);
      }
    }
  );

  useEffect(() => {
    return cancelFetch;
  }, []);

  const handleClick = (event) => {
    event.preventDefault();

    if (reportState && !user.isModerator) return;

    const updatedPost = {
      ...post,
      isReported: reportState ? false : true,
    };

    performFetch({
      method: "PUT",
      body: JSON.stringify(updatedPost),
    });
  };

  if (isLoading || user._id === post.userId) return null;

  if (error) {
    alert(error);
  }

  return (
    <li>
      <span onClick={handleClick}>
        {reportState ? "Reported!" : "Report post"}
      </span>
    </li>
  );
};

ReportPost.propTypes = {
  post: PropTypes.object,
  refreshUsers: PropTypes.func,
};

export default ReportPost;
