import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../hooks/useUserContext";

function LoginForm() {
  //Basic Login page. Just to reach profile page

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(UserContext);

  function handleUsernameChange(event) {
    setUsername(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    //When Backend ready we will send userName and password with Rob's useFetch and expect to have user information back. Then we will save it in our UserContext with Login function
    //Right now simply sending userName
    login(username);
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
            value={username}
            onChange={handleUsernameChange}
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
            minLength="8"
          />
        </label>
        <br />
        <button type="submit">Log in</button>
        <button type="button">
          <Link to="/signup">Sign up</Link>
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
