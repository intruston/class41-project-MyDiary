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
      setReportState(response.result.isReported);
      refreshUsers();
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

  return (
    <li>
      <span onClick={handleClick}>
        {reportState ? "Reported!" : "Report post"}
      </span>
      {error && (
        <div className="error">
          {typeof error === "string"
            ? error
            : "Error happened. Refresh the page"}
        </div>
      )}
    </li>
  );
};

ReportPost.propTypes = {
  post: PropTypes.object,
  refreshUsers: PropTypes.func,
};

export default ReportPost;
