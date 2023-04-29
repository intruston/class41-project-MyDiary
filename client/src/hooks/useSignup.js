import { useState } from "react";
//import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [signupError, setSignupError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  //  const { dispatch } = useAuthContext();

  const signup = async (
    email,
    password,
    firstName,
    lastName,
    birthday,
    country,
    bio
  ) => {
    setIsLoading(true);
    setSignupError(null);

    const url = `${process.env.BASE_SERVER_URL}/api/user/create`;

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setSignupError(json.error);
    } else {
      // save the user to local storage
      localStorage.setItem("auth", JSON.stringify(json));

      // update the auth context
      //dispatch({ type: "LOGIN", payload: json });

      setIsLoading(false);
    }
  };

  return { signupError, isLoading, signup };
};
