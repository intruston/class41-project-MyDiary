import { useEffect } from "react";
import { useAuthContext } from "./useAuthContext";
import { useUserContext } from "./useUserContext";
import { useNavigate } from "react-router-dom";
import useFetch from "./useFetch";

export const useLogin = () => {
  const { dispatch: userDispatch } = useUserContext();
  const { dispatch, auth } = useAuthContext();
  const navigate = useNavigate();

  // Fetch for getting user info from database
  const { performFetch: performFetchUser } = useFetch(
    `/user/${auth?.id}`,
    (response) => {
      // Setting UserContext with fetched User.
      userDispatch({ type: "SET_USER", payload: response.result });
      navigate("/my-posts");
    }
  );

  // Fetch for login
  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    "/user/login",
    (response) => {
      // Setting Token info into Local storage.
      localStorage.setItem("auth", JSON.stringify(response.result));
      // Setting AuthContext
      dispatch({ type: "LOGIN", payload: response.result });
    }
  );

  useEffect(() => {
    if (auth) {
      performFetchUser();
    }
    return cancelFetch;
  }, [auth]);

  const login = async (email, password) => {
    performFetch({
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
  };

  return { error, isLoading, login };
};
