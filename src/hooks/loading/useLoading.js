import { useState } from 'react';

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
