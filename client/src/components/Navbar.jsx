import React, { useContext } from "react";
import NavbarLinks from "./NavbarLinks";
import { icons } from "../assets/svg.js";
import profileIcon from "../assets/profile-icon.png";
import { UserContext } from "../hooks/useUserContext";

const Navbar = () => {
  const { user, logout } = useContext(UserContext);
  const logoutUser = () => {
    logout();
  };
  return (
    <nav className="navbar">
      <div className="user-profile">
        <div className="user-status">
          <div className="user-online">{icons.online}</div>
          <div className="user-information">
            <h3>{user}</h3>
            <h4>user id</h4>
          </div>
        </div>
        <div className="profile-picture">
          <img src={profileIcon} alt="profile picture" />
        </div>
      </div>

      <ul className="nav-links">
        <NavbarLinks link={"/profile"} text={"My diary"} svg={icons.home} />
        <NavbarLinks link={"/friends"} text={"Friends"} svg={icons.friends} />
        <NavbarLinks link={"/feed"} text={"Feeds"} svg={icons.feed} />
        <NavbarLinks link={"/search"} text={"Search"} svg={icons.search} />
        <NavbarLinks
          link={"/settings"}
          text={"Settings"}
          svg={icons.settings}
        />
      </ul>
      <div className="logout" onClick={logoutUser}>
        <hr />
        <NavbarLinks link={""} text={"Logout"} svg={icons.logout} />
      </div>
    </nav>
  );
};

export default Navbar;
