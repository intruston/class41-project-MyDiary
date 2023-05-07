import React, { useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";
import { useSignup } from "../../hooks/useSignup";
import "./SignUp.css";
import background from "../../assets/landing/landing-background.jpg";

function RegisterForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [country, setCountry] = useState("");
  const [bio, setBio] = useState("");
  const [agreeToPrivacyPolicy, setAgreeToPrivacyPolicy] = useState(false);

  const { userError, signupError, isLoading, signup } = useSignup();

  async function handleSubmit(event) {
    event.preventDefault();

    await signup(
      email,
      password,
      firstName,
      lastName,
      dateOfBirth,
      country,
      bio
    ); // signup the user
  }

  return (
    <div
      className="signup-page"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
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
                minLength="2"
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
                minLength="2"
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
            <p>
              Country <small className="signup-small">(not required)</small>
            </p>
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
            <p>
              Bio <small className="signup-small">(not required)</small>
            </p>
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
                By clicking &ldquo;Sign up&ldquo; you agree to{" "}
                <a
                  href="https://github.com/HackYourFuture/class41-project-team-two/blob/develop/LICENSE.md"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  the privacy policy
                </a>
              </small>
            </label>
          </div>
          <br />
          <button
            type="submit"
            disabled={!agreeToPrivacyPolicy || isLoading}
            className="login-button"
          >
            Sign up
          </button>
        </form>
        <br />
        {isLoading && <Loading />}
        {(signupError || userError) && (
          <div className="error">
            {signupError} || {userError}
          </div>
        )}
      </div>
    </div>
  );
}

export default RegisterForm;
