import { useEffect, useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useUserContext } from "./useUserContext";
import useFetch from "./useFetch";

export const useLogin = () => {
  const { dispatch: userDispatch } = useUserContext();
  const { dispatch, auth } = useAuthContext();
  const [userId, setUserId] = useState("");
  const { performFetch: performFetchUser } = useFetch(
    `/user/${userId}`,
    (response) => {
      setUserId(null);
      userDispatch({ type: "SET_USER", payload: response.result });
    }
  );
  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    "/user/login",
    (response) => {
      setUserId(response.result.id);
      localStorage.setItem("auth", JSON.stringify(response.result));
      dispatch({ type: "LOGIN", payload: response.result });
    }
  );

  useEffect(() => {
    if (userId && auth) {
      performFetchUser();
    }
    return cancelFetch;
  }, [userId, auth]);

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
