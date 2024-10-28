export const handleFirebaseError = (error) => {
  return error instanceof Error ? error.message.split(": ")[1] : String(error);
};
