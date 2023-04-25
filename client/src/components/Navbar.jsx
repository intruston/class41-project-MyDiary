import React, { useContext } from "react";
import NavbarLinks from "./NavbarLinks";
import "./Navbar.css";
import PropTypes from "prop-types";
import { icons } from "../assets/svg.js";
import { UserContext } from "../hooks/useUserContext";
import ProfilePicture from "./ProfilePicture";
import useLogout from "../hooks/useLogout";

const Navbar = ({ active }) => {
  // Getting user information and logout function from context
  const { user } = useContext(UserContext);
  const logout = useLogout();
  const logoutUser = () => {
    logout();
  };
  return (
    <nav className="navbar">
      <div>
        <div className="user-status">
          <div className="user-online">{icons.online}</div>
          <div className="user-information">
            <h3>{user.firstName}</h3>
          </div>
        </div>
        <ProfilePicture profilePicture={user.profilePicture} />
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
      <div>
        <hr />
        <div className="logout" onClick={logoutUser}>
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
