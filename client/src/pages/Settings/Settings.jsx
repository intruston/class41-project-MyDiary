import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import SettingsMiddle from "../../components/SettingsMiddle";
import SettingsRight from "../../components/SettingsRight";
import "./Settings.css";
import Modal from "../../components/Modal";
import ChangePasswordForm from "../../components/ChangePasswordForm";

const Settings = () => {
  const [modalActive, setModalActive] = useState(false);

  return (
    <div className="page-container">
      <Navbar active={"Settings"} />
      <SettingsMiddle setActive={setModalActive} />
      <SettingsRight />
      <Modal active={modalActive} setActive={setModalActive}>
        <ChangePasswordForm setActive={setModalActive} />
      </Modal>
    </div>
  );
};

export default Settings;
