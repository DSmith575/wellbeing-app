/**
 * @name useLoading
 * @description A custom hook that handles loading states for any component.
 * @returns {Object} An object containing the loading state and a function to set the loading state.
 */

import { useState } from "react";

// Custom hook to handle loading states for any component
const useLoading = () => {
  const [isLoading, setIsLoading] = useState({});

  const setLoading = (key, loading) => {
    setIsLoading((prevState) => ({
      ...prevState,
      [key]: loading,
    }));
  };

  const loading = (key) => {
    return isLoading[key] || false;
  };

  return { loading, setLoading };
};

export default useLoading;
