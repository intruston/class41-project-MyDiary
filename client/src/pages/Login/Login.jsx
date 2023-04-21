import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { UserContext } from "../../hooks/useUserContext";

function LoginForm() {
  //Basic Login page. Just to reach profile page

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(UserContext);

  const { isLoading, error, performFetch } = useFetch(
    "/user/login",
    (response) => {
      // Extract the firstName property from the response object
      const firstName = response.result.firstName;
      // Call the login function with the extracted firstName property
      login(firstName);
    }
  );

  // This was added to prevent this Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
  // But React 18 has removed this warning message, because of misleading.
  // useEffect(() => {
  //   return () => {
  //     cancelFetch();
  //   };
  // }, [cancelFetch]);

  function handleSubmit(event) {
    event.preventDefault();
    performFetch({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
  }

  return (
    <div>
      <h1>Log in to My diary</h1>
      <p>
        You will be able to comment on posts, save posts to your calendar and
        find friends according to your interests
      </p>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
            minLength="8"
          />
        </label>
        <br />
        <button type="submit">Log in</button>
        <button type="button">
          <Link to="/signup">Sign up</Link>
        </button>
        {isLoading && <div>Loading...</div>}
        {error && <div>Something is wrong: {error.message}</div>}
      </form>
    </div>
  );
}

export default LoginForm;
