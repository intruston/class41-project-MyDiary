import React, { useContext } from "react";
import { UserContext } from "../../hooks/useUserContext";
const Profile = () => {
  const { user } = useContext(UserContext);
  return (
    <div>
      <h1>User Name is:</h1>
      <p>{user}</p>
    </div>
  );
};

export default Profile;
