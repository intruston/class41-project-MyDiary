import { useEffect } from "react";
// import { useAuthContext } from "./useAuthContext";
// import { useUserContext } from "./useUserContext";
import { useNavigate } from "react-router-dom";
import useFetch from "./useFetch";
export const useSignup = () => {
  // const { dispatch: userDispatch } = useUserContext();
  // const { dispatch, auth } = useAuthContext();
  const navigate = useNavigate();
  // ?? Fetch for getting user info from database
  // const { performFetch: performFetchUser } = useFetch(
  //   `/user/${auth?.id}`,
  //   (response) => {
  // ?? Setting UserContext with fetched User.
  //     userDispatch({ type: "SET_USER", payload: response.result });
  //     alert("User created successfully");
  //     navigate("/myPosts");
  //   }
  // );
  const {
    isLoading,
    error: signupError,
    performFetch,
    cancelFetch,
  } = useFetch("/user/create", () => {
    // !! } = useFetch("/user/create", (response) => {
    // ?? save the user to local storage
    // localStorage.setItem("auth", JSON.stringify(response.result));
    // ?? Setting AuthContext
    // dispatch({ type: "LOGIN", payload: response.result });
    alert("User created successfully");
    navigate("/login");
  });

  useEffect(() => {
    // if (auth) {
    //   console.log("here we are");
    //   performFetchUser();
    // }
    return cancelFetch;
    // !! }, [auth]);
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
        email,
        password,
        firstName,
        lastName,
        birthday,
        country,
        bio,
      }),
    });
  };

  return { signupError, isLoading, signup };
};
