import React from "react";
import "./settingsRight.css";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import ContactMailOutlinedIcon from "@mui/icons-material/ContactMailOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import WebOutlinedIcon from "@mui/icons-material/WebOutlined";
import ContactsBlock from "./ContactsBlock";

const SettingsRight = () => {
  return (
    <div className="right-section">
      <div className="single-container settings-right-wrapper">
        <span className="settings-right-title">
          How to contact us for a variety of reasons
        </span>

        <div className="settings-right-contacts">
          <ContactsBlock
            icon={<EmailOutlinedIcon fontSize="large" />}
            text={"You could write us if you any questions or issues:"}
            link={"deardiaryteam@proton.me"}
          />

          <ContactsBlock
            icon={<ContactMailOutlinedIcon fontSize="large" />}
            text={"You could also send us your feedback:"}
            link={"c41hyftwo@gmail.com"}
          />

          <ContactsBlock
            icon={<LanguageOutlinedIcon fontSize="large" />}
            text={
              "This project was made by HuckYourFuture students. You can find more information about the organization here:"
            }
            link={"hackyourfuture.net"}
          />

          <ContactsBlock
            icon={<WebOutlinedIcon fontSize="large" />}
            text={"Link to the GitHub:"}
            link={"github.com/HackYourFuture"}
          />
        </div>
      </div>
    </div>
  );
};

export default SettingsRight;
