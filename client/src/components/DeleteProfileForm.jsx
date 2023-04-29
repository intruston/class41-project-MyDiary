import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./deleteProfileForm.css";
import { useAuthContext } from "../hooks/useAuthContext";
import { useUserContext } from "../hooks/useUserContext";
import useFetch from "../hooks/useFetch";
import useLogout from "../hooks/useLogout";
import Loading from "./Loading";

const DeleteProfileForm = ({ setModalDeleteActive }) => {
  const { auth } = useAuthContext();
  const { user, dispatch } = useUserContext();
  const [deleteWord, setDeleteWord] = useState("");
  const logout = useLogout();

  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    `/user/${user?._id}`,
    (response) => {
      if (response.success) {
        clearModal();
        alert("Profile and all data DELETED successfully!");
        logout();
        dispatch({
          type: "DELETE_USER",
          payload: null,
        });
      } else {
        alert("Profile and all data DELETED successfully!");
      }
    }
  );

  const clearModal = () => {
    setDeleteWord("");
    setModalDeleteActive(false);
  };

  useEffect(() => {
    return cancelFetch;
  }, []);

  const deleteProfile = (e) => {
    e.preventDefault();
    if (deleteWord !== "delete") {
      alert(
        "If you want to delete your profile permanently enter 'delete' in the field below"
      );
      return;
    }
    if (confirm("Are you sure you want to DELETE your account and all data?")) {
      performFetch({
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
    }
  };

  return (
    <>
      <div className="deleteProfileWrapper">
        <h2>DELETE PROFILE</h2>
        <div className="attention">
          ATTENTION!!! This action is irreversible!
        </div>
        <form className="deleteProfileForm" onSubmit={deleteProfile}>
          <label>
            Enter &quot;<b>delete</b>&quot; for confirm:
          </label>
          <input
            name="deleteWord"
            value={deleteWord}
            type="text"
            required
            minLength={6}
            onChange={(e) => setDeleteWord(e.target.value)}
          />

          <div className="buttonsWrapper">
            <button
              className="deleteCancel"
              type="button"
              onClick={() => clearModal()}
            >
              CANCEL
            </button>
            <button className="deleteSubmit" type="submit">
              DELETE
            </button>
          </div>
        </form>
      </div>
      <br />
      {isLoading && <Loading />}
      {error && <div className="error">{error}</div>}
    </>
  );
};

DeleteProfileForm.propTypes = {
  setModalDeleteActive: PropTypes.func.isRequired,
};

export default DeleteProfileForm;
