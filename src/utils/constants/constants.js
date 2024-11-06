export const firestoreCollections = {
  events: "events",
  users: "users",
};

export const alertMessages = {
  success: "Event joined successfully",
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

export const eventRecurrence = [
  {
    label: "Challenge",
    iconName: "puzzle-outline",
  },
  {
    label: "Recurring",
    iconName: "autorenew",
  },
  {
    label: "One-off",
    iconName: "calendar-check",
  },
];

/**
 * Array of event categories.
 * @typedef {Object} EventCategory
 * @property {string} label - The label of the category.
 * @property {string} uri - The URI of the category image.
 */

/**
 * Array of event categories.
 * @type {EventCategory[]}
 */
export const eventCategories = [
  {
    label: "Taha Wairua (Spiritual)",
    uri: require("../../../assets/accordionBanners/cat_meow.jpg"),
  },
  {
    label: "Taha Hinengaro (Mental and Emotional)",
    uri: require("../../../assets/accordionBanners/smol_cat.png"),
  },
  {
    label: "Taha Whānau (Family and Social)",
    uri: require("../../../assets/accordionBanners/assetTestBanner.jpg"),
  },
  {
    label: "Taha Tinana (Physical)",
    uri: require("../../../assets/accordionBanners/this_cat.jpg"),
  },
  {
    label: "Whenua (Land, Roots)",
    uri: require("../../../assets/accordionBanners/black_cat.jpg"),
  },
];
