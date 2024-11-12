/**
 * @name handleFirebaseError
 * @description This function handles errors from Firebase.
 * @param {Object} error - The error object.
 * @returns {string} The error message.
 */

export const handleFirebaseError = (error) => {
  return error instanceof Error ? error.message.split(": ")[1] : String(error);
};
