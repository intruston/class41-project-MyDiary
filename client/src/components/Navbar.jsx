import React, { useContext } from "react";
import NavbarLinks from "./NavbarLinks";
import "./Navbar.css";
import PropTypes from "prop-types";
import { icons } from "../assets/svg.js";
import profileIcon from "../assets/profile-icon.png";
import { UserContext } from "../hooks/useUserContext";

const Navbar = ({ active }) => {
  // Getting user information and logout function from context
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
            <h3>{user.firstName}</h3>
          </div>
        </div>
        <div className="profile-picture">
          <img src={profileIcon} alt="profile picture" />
        </div>
      </div>

      <ul className="nav-links">
        <NavbarLinks
          link={"/myPosts"}
          text={"My diary"}
          svg={icons.home}
          active={active}
        />
        <NavbarLinks
          link={"/friends"}
          text={"Friends"}
          svg={icons.friends}
          active={active}
        />
        <NavbarLinks
          link={"/feeds"}
          text={"Feeds"}
          svg={icons.feed}
          active={active}
        />
        <NavbarLinks
          link={"/search"}
          text={"Search"}
          svg={icons.search}
          active={active}
        />
        <NavbarLinks
          link={"/settings"}
          text={"Settings"}
          svg={icons.settings}
          active={active}
        />
      </ul>
      <div className="logout">
        <hr />
        <div onClick={logoutUser}>
          <NavbarLinks link={""} text={"Logout"} svg={icons.logout} />
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  active: PropTypes.string.isRequired,
};

export default Navbar;
