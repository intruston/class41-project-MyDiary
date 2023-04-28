import React, { useState } from "react";

const FriendsRight = () => {
  return (
    <div className="right-section">
      <div className="single-container">
        <div>
          <FriendsToFollow />
        </div>
      </div>
    </div>
  );
};

function FriendsToFollow() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    country: "",
    city: "",
    email: "",
  });

  const handleSubmitSearch = (e) => {
    e.preventDefault();
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="form-container">
      <h3>+ Friends to follow</h3>
      <form onSubmit={handleSubmitSearch}>
        <div className="input-container">
          <label htmlFor="firstName">First name:</label>
          <input
            type="text"
            className="search-form"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            placeholder="Good"
          />
        </div>
        <div className="input-container">
          <label htmlFor="lastName">Last name:</label>
          <input
            type="text"
            className="search-form"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            placeholder="Cat"
          />
        </div>
        <div className="input-container">
          <label htmlFor="dob">Date of birth:</label>
          <input
            type="date"
            className="search-form"
            id="dob"
            name="dob"
            value={formData.dob}
            onChange={handleInputChange}
          />
        </div>
        <div className="input-container">
          <label htmlFor="country">Country:</label>
          <input
            type="text"
            className="search-form"
            id="country"
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            placeholder="Netherlands"
          />
        </div>
        <div className="input-container">
          <label htmlFor="city">City:</label>
          <input
            type="text"
            className="search-form"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            placeholder="Amsterdam"
          />
        </div>
        <div className="input-container">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            className="search-form"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="example@mail.com"
          />
        </div>
        <div className="search-button">
          <button type="submit">Search</button>
        </div>
      </form>
    </div>
  );
}

export default FriendsRight;
