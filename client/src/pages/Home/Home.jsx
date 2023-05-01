import React, { useEffect } from "react";
import useFetch from "../../hooks/useFetch";

import { Link } from "react-router-dom";
import TEST_ID from "./Home.testid";
import Loading from "../../components/Loading";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useUserContext } from "../../hooks/useUserContext";

const Home = () => {
  const link = "/login";
  const { dispatch } = useUserContext();
  const { auth } = useAuthContext();
  const navigate = useNavigate();
  // Fetch for getting user info from database
  const { performFetch, cancelFetch, isLoading, error } = useFetch(
    `/user/${auth?.id}`,
    (response) => {
      // Setting UserContext with fetched User.
      dispatch({ type: "SET_USER", payload: response.result });
      navigate("/my-posts");
    }
  );

  useEffect(() => {
    if (auth) {
      performFetch();
    }
    return cancelFetch;
  }, [auth]);
  return (
    <div className="has-loading" data-testid={TEST_ID.container}>
      <h1>This is the homepage</h1>
      <p>Good luck with the project!</p>
      <Link to={link}>
        <button> Login</button>
      </Link>
      {error && <div className="error">{error.message}</div>}
      {isLoading && <Loading />}
    </div>
  );
};

export default Home;
