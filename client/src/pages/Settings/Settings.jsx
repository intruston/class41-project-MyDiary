import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import MiddleSection from "./MiddleSection";
import RightSection from "./RightSection";
import "./Settings.css";
import Modal from "../../components/Modal";
import ChangePasswordForm from "../../components/ChangePasswordForm";

const Settings = () => {
  const [modalActive, setModalActive] = useState(false);

  return (
    <div className="page-container">
      <Navbar active={"Settings"} />
      <MiddleSection setActive={setModalActive} />
      <RightSection />
      <Modal active={modalActive} setActive={setModalActive}>
        <ChangePasswordForm setActive={setModalActive} />
      </Modal>
    </div>
  );
};

export default Settings;
