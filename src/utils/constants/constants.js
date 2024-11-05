export const eventCollection = "events";
export const userCollection = "users";

export const alertMessages = {
  cameraAccess: "Camera access is required to scan.",
  allowCamera: "Allow Camera Access",
  eventNotAvailable: "Event is not on today or has ended.",
  alreadySignedUp: "You have already signed up for this event.",
  eventFull: "Event is full.",
  error: "Error",
  eventNameError: "Event name is not available.",
  qrInvalid: "Invalid QR code.",
};

export const userRoles = {
  admin: "admin",
  user: "user",
};

export const eventCategories = [
  {
    label: "Taha Wairua (Spiritual)",
    value: "Taha Wairua (Spiritual)",
    uri: require("../../../assets/assetTestBanner.jpg"),
  },
  {
    label: "Taha Hinengaro (Mental and Emotional)",
    value: "Taha Hinengaro (Mental and Emotional)",
    uri: require("../../../assets/assetTestBanner.jpg"),
  },
  {
    label: "Taha Whānau (Family and Social)",
    value: "Taha Whānau (Family and Social)",
    uri: require("../../../assets/assetTestBanner.jpg"),
  },
  {
    label: "Taha Tinana (Physical)",
    value: "Taha Tinana (Physical)",
    uri: require("../../../assets/assetTestBanner.jpg"),
  },
  {
    label: "Whenua (Land, Roots)",
    value: "Whenua (Land, Roots)",
    uri: require("../../../assets/assetTestBanner.jpg"),
  },
];
