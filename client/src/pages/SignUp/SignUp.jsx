import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Loading from "../../components/Loading";

function RegisterForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [country, setCountry] = useState("");
  const [bio, setBio] = useState("");
  const [agreeToPrivacyPolicy, setAgreeToPrivacyPolicy] = useState(false);
  const navigate = useNavigate();

  const { isLoading, error, performFetch } = useFetch("/user/create", () => {
    alert("User created successfully");
    // Redirect the user to the login page
    navigate("/login");
  });

  // This was added to prevent this Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
  // But React 18 has removed this warning message, because of misleading.
  // useEffect(() => {
  //   return () => {
  //     cancelFetch();
  //   };
  // }, [cancelFetch]);

  function handleSubmit(event) {
    event.preventDefault();

    // Send the data to the server
    performFetch({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          firstName,
          lastName,
          birthday: dateOfBirth,
          email,
          password,
          country,
          bio,
        },
      }),
    });
  }

  return (
    <div className="signup-div">
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        <button type="button" className="exit-button">
          <Link to="/login">×</Link>
        </button>
        <br />
        <div className="signup-name-div">
          <label>
            <p>First Name</p>
            <input
              type="text"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              required
              className="signup-input"
              placeholder="John"
            />
          </label>
        </div>
        <div className="signup-name-div">
          <label>
            <p>Surname</p>
            <input
              type="text"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              required
              className="signup-input"
              placeholder="Doe"
            />
          </label>
        </div>
        <label>
          <p>Date of Birth</p>
          <input
            type="date"
            value={dateOfBirth}
            onChange={(e) => {
              setDateOfBirth(e.target.value);
            }}
            required
            className="login-input"
          />
        </label>
        <label>
          <p>Email</p>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
            placeholder="example@mail.com"
            className="login-input"
          />
        </label>
        <label>
          <p>Password</p>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
            minLength="8"
            placeholder="Your password"
            className="login-input"
          />
        </label>
        <label>
          <p>Country</p>
          <input
            type="text"
            value={country}
            onChange={(e) => {
              setCountry(e.target.value);
            }}
            className="login-input"
            placeholder="Netherlands"
          />
        </label>
        <label>
          <p>Bio</p>
          <input
            type="text"
            value={bio}
            onChange={(e) => {
              setBio(e.target.value);
            }}
            className="login-input"
            placeholder="Welcome to my diary!"
          />
        </label>
        <br />
        <div className="signup-checkbox-div">
          <label>
            <input
              type="checkbox"
              checked={agreeToPrivacyPolicy}
              onChange={(e) => {
                setAgreeToPrivacyPolicy(e.target.checked);
              }}
              className="checkbox-input"
            />
            <small>
              By clicking &ldquo;Sign up&ldquo; you agree to the privacy policy
            </small>
          </label>
        </div>
        <br />
        <button
          type="submit"
          disabled={!agreeToPrivacyPolicy}
          className="login-button"
        >
          Sign up
        </button>
      </form>
      <br />
      {isLoading && <Loading />}
      {error && <div className="error">{error}</div>}
    </div>
  );
}

export default RegisterForm;
