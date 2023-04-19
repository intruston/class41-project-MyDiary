import React, { useEffect, useState } from "react";

import Input from "../../components/Input";
import useFetch from "../../hooks/useFetch";
import TEST_ID from "./CreateUser.testid";

const CreateUser = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [country, setCountry] = useState("");
  const [bio, setBio] = useState("");

  const onSuccess = () => {
    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
    setBirthday("");
    setCountry("");
    setBio("");
  };
  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    "/user/create",
    onSuccess
  );

  useEffect(() => {
    return cancelFetch;
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    performFetch({
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        user: { email, password, firstName, lastName, birthday, country, bio },
      }),
    });
  };

  let statusComponent = null;
  if (error != null) {
    statusComponent = (
      <div data-testid={TEST_ID.errorContainer}>
        Error while trying to create user: {error.toString()}
      </div>
    );
  } else if (isLoading) {
    statusComponent = (
      <div data-testid={TEST_ID.loadingContainer}>Creating user....</div>
    );
  }

  return (
    <div data-testid={TEST_ID.container}>
      <h1>What should the user be?</h1>
      <form onSubmit={handleSubmit}>
        <Input
          name="email"
          placeholder="email"
          value={email}
          onChange={(value) => setEmail(value)}
          // data-testid={TEST_ID.emailInput}
        />
        <Input
          name="password"
          placeholder="password"
          value={password}
          onChange={(value) => setPassword(value)}
        />
        <Input
          name="firstName"
          placeholder="firstName"
          value={firstName}
          onChange={(value) => setFirstName(value)}
          // data-testid={TEST_ID.nameInput}
        />
        <Input
          name="lastName"
          placeholder="lastName"
          value={lastName}
          onChange={(value) => setLastName(value)}
        />
        <Input
          name="birthday"
          placeholder="birthday"
          value={birthday}
          onChange={(value) => setBirthday(value)}
        />
        <Input
          name="country"
          placeholder="country"
          value={country}
          onChange={(value) => setCountry(value)}
        />
        <Input
          name="bio"
          placeholder="bio"
          value={bio}
          onChange={(value) => setBio(value)}
        />

        <button type="submit" data-testid={TEST_ID.submitButton}>
          Submit
        </button>
      </form>
      {statusComponent}
    </div>
  );
};

export default CreateUser;
