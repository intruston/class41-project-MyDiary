import React, { useState, useContext } from "react";
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
    <form onSubmit={handleSubmit}>
      <h3>Login</h3>
      <label>
        Username:
        <input type="text" value={username} onChange={handleUsernameChange} />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
}

export default LoginForm;
