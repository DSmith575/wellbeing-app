/**
 * @name useFormInput
 * @description The useFormInput hook is used to manage form input fields.
 * @param {string} initialValue - The initial value of the input field.
 * @returns {Object} An object containing the value of the input field, a function to update the value, and a function to reset the value.
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
