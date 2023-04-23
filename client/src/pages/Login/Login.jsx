import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { UserContext } from "../../hooks/useUserContext";
import Loading from "../../components/Loading";

function LoginForm() {
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
    <div className="login-div">
      <h2>Log in to My diary</h2>
      <br />
      <p>
        You will be able to comment on posts, save posts to your calendar and
        find friends according to your interests
      </p>
      <br />
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
            placeholder="Email"
            className="login-input"
          />
        </label>
        <br />
        <label>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
            minLength="8"
            placeholder="Password"
            className="login-input"
          />
        </label>
        <br />
        <button type="submit" className="login-button">
          Log in
        </button>
        <button type="button" className="signup-button">
          <Link to="/signup">Sign up</Link>
        </button>
      </form>
      <br />
      {isLoading && <Loading />}
      {error && <div className="error">{error}</div>}
    </div>
  );
}

export default LoginForm;
