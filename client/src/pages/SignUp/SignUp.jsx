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

  async function handleSubmit(event) {
    event.preventDefault();

    if (!firstName || !lastName || !dateOfBirth || !email || !password) {
      alert("Please fill out all fields before submitting");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/user/create", {
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
            country: "",
            bio: "",
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create user");
      }

      const data = await response.json();
      alert("User created successfully", data);
      // Redirect to the login page...
    } catch (error) {
      alert("Error creating user. Please try again later.");
    }
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
              onChange={handleLastNameChange}
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
              onChange={handleDateOfBirthChange}
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
              onChange={handleEmailChange}
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
              onChange={handlePasswordChange}
              required
              minLength="8"
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
        <button type="submit" disabled={!agreeToPrivacyPolicy}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default RegisterForm;
