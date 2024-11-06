/**
 * Custom hook for managing form input state.
 *
 * @param {any} initialValue - The initial value of the input.
 * @returns {Object} - An object containing the current value, a change handler, and a reset function.
 */

import { useState } from "react";

const useFormInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (text) => {
    setValue(text);
  };

  const reset = () => {
    setValue(initialValue);
  };

  return {
    value,
    onChange: handleChange,
    reset,
  };
};

export default useFormInput;
