import { useState } from "react";

const useError = () => {
  const [isError, setIsError] = useState({});

  const setError = (key, error) => {
    setIsError((prevState) => ({
      ...prevState,
      [key]: error,
    }));
  };

  const error = (key) => {
    return isError[key] || "";
  };

  return { error, setError };
};

export default useError;
