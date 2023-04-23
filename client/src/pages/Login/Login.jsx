import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { UserContext } from "../../hooks/useUserContext";
import Loading from "../../components/Loading";

function LoginForm() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(UserContext);
  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    "/user/login",
    (response) => {
      setUser(response.result);
    }
  );
  useEffect(() => {
    return cancelFetch;
  }, []);

  useEffect(() => {
    login(user);
  }, [user]);

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
