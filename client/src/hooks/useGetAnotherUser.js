import { useState, useEffect } from "react";
import useFetch from "./useFetch";

const useGetAnotherUser = ({ anotherUserId }) => {
  const [anotherUser, setAnotherUser] = useState(null);
  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    `/user/${anotherUserId}`,
    (response) => {
      setAnotherUser(response.result);
    }
  );

  useEffect(() => {
    performFetch();
    return cancelFetch;
  }, []);
  return { isLoading, error, anotherUser };
};

export default useGetAnotherUser;
