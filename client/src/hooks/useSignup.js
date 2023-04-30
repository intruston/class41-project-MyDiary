import { useEffect } from "react";
import useFetch from "./useFetch";
export const useSignup = () => {
  const {
    isLoading,
    error: signupError,
    performFetch,
    cancelFetch,
  } = useFetch("/user/create", (response) => {
    localStorage.setItem("auth", JSON.stringify(response.result));
  });
  useEffect(() => {
    return cancelFetch;
  }, []);

  const signup = async (
    email,
    password,
    firstName,
    lastName,
    birthday,
    country,
    bio
  ) => {
    performFetch({
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        user: { email, password, firstName, lastName, birthday, country, bio },
      }),
    });
  };

  return { signupError, isLoading, signup };
};
