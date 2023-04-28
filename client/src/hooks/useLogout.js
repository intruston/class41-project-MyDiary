import { useAuthContext } from "./useAuthContext.js";

const useLogout = () => {
  const { dispatch } = useAuthContext();

  const logout = () => {
    // remove the user from local storage
    localStorage.removeItem("auth");

    // update the auth context
    dispatch({ type: "LOGOUT" });
  };

  return logout;
};

export default useLogout;
