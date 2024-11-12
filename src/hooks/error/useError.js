/**
 * @name useError
 * @description The useError hook is used to manage errors in the app.
 * @returns {Object} An object containing the error message and a function to set an error.
 */

import { useState } from "react";

const useError = () => {
  const [isError, setIsError] = useState({});

  /**
   * Sets an error for a specific key.
   *
   * @param {string} key - The key to associate the error with.
   * @param {string} error - The error message.
   */
  const setError = (key, error) => {
    setIsError((prevState) => ({
      ...prevState,
      [key]: error,
    }));
  };

  /**
   * Retrieves the error message for a specific key.
   *
   * @param {string} key - The key associated with the error.
   * @returns {string} The error message.
   */
  const error = (key) => {
    return isError[key] || "";
  };

  return { error, setError };
};

export default useError;
