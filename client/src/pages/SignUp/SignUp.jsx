import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

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
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Register</h1>
        <p>
          <label>
            First Name:
            <input
              type="text"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              required
            />
          </label>
        </p>
        <p>
          <label>
            Surname:
            <input
              type="text"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              required
            />
          </label>
        </p>
        <p>
          <label>
            Date of Birth:
            <input
              type="date"
              value={dateOfBirth}
              onChange={(e) => {
                setDateOfBirth(e.target.value);
              }}
              required
            />
          </label>
        </p>
        <p>
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
        </p>
        <p>
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
        </p>
        <p>
          <label>
            Country:
            <input
              type="text"
              value={country}
              onChange={(e) => {
                setCountry(e.target.value);
              }}
            />
          </label>
        </p>
        <p>
          <label>
            Bio:
            <input
              type="text"
              value={bio}
              onChange={(e) => {
                setBio(e.target.value);
              }}
            />
          </label>
        </p>
        <p>
          <label>
            <input
              type="checkbox"
              checked={agreeToPrivacyPolicy}
              onChange={(e) => {
                setAgreeToPrivacyPolicy(e.target.checked);
              }}
            />
            By clicking &ldquo;Sign up&ldquo; you agree to the privacy policy
          </label>
        </p>
        <button type="submit" disabled={!agreeToPrivacyPolicy}>
          Submit
        </button>
        {isLoading && <div>Loading...</div>}
        {error && <div>Something is wrong: {error.message}</div>}
      </form>
    </div>
  );
}

export default RegisterForm;
