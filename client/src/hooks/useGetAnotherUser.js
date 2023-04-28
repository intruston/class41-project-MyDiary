import { useState, useEffect } from "react";
import useFetch from "./useFetch";
import { useAuthContext } from "./useAuthContext";

const useGetAnotherUser = ({ anotherUserId }) => {
  const { auth } = useAuthContext();

  const [anotherUser, setAnotherUser] = useState(null);
  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    `/user/${anotherUserId}`,
    (response) => {
      setAnotherUser(response.result);
    }
  );

  useEffect(() => {
    performFetch({
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    });
    return cancelFetch;
  }, [anotherUserId]);

  const reset = () => {
    setAnotherUser(null);
  };

  return { isLoading, error, anotherUser, reset };
};

export default useGetAnotherUser;
