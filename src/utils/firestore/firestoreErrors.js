/**
 * Handles Firebase errors by extracting the error message.
 * @param {Error|any} error - The error object.
 * @returns {string} - The extracted error message.
 */

export const handleFirebaseError = (error) => {
  return error instanceof Error ? error.message.split(": ")[1] : String(error);
};
