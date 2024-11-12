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
  calendarAccess: "Calendar access is required to add events to your calendar.",
  allowCalendar: "Allow Calendar Access",
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
    uri: require("../../../assets/accordionBanners/otagoLogoBanner.png"),
  },
  {
    label: "Taha Hinengaro (Mental and Emotional)",
    uri: require("../../../assets/accordionBanners/otagoLogoBanner.png"),
  },
  {
    label: "Taha Whānau (Family and Social)",
    uri: require("../../../assets/accordionBanners/otagoLogoBanner.png"),
  },
  {
    label: "Taha Tinana (Physical)",
    uri: require("../../../assets/accordionBanners/otagoLogoBanner.png"),
  },
  {
    label: "Whenua (Land, Roots)",
    uri: require("../../../assets/accordionBanners/otagoLogoBanner.png"),
  },
];
