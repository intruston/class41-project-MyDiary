import React, { useState } from "react";

function RegisterForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreeToPrivacyPolicy, setAgreeToPrivacyPolicy] = useState(false);

  function handleFirstNameChange(event) {
    setFirstName(event.target.value);
  }

  function handleLastNameChange(event) {
    setLastName(event.target.value);
  }

  function handleDateOfBirthChange(event) {
    setDateOfBirth(event.target.value);
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handlePrivacyPolicyChange(event) {
    setAgreeToPrivacyPolicy(event.target.checked);
  }

  function handleSubmit(event) {
    event.preventDefault();
    // Handle form submission here
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
              onChange={handleFirstNameChange}
            />
          </label>
        </p>
        <p>
          <label>
            Surname:
            <input
              type="text"
              value={lastName}
              onChange={handleLastNameChange}
            />
          </label>
        </p>
        <p>
          <label>
            Date of Birth:
            <input
              type="date"
              value={dateOfBirth}
              onChange={handleDateOfBirthChange}
            />
          </label>
        </p>
        <p>
          <label>
            Email:
            <input type="email" value={email} onChange={handleEmailChange} />
          </label>
        </p>
        <p>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </label>
        </p>
        <p>
          <label>
            <input
              type="checkbox"
              checked={agreeToPrivacyPolicy}
              onChange={handlePrivacyPolicyChange}
            />
            By clicking &ldquo;Sign up&ldquo; you agree to the privacy policy
          </label>
        </p>
        <button type="submit">Sign up</button>
      </form>
    </div>
  );
}

export default RegisterForm;
