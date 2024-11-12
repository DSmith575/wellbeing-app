/**
 * @name findEventRecurrenceIcon
 * @description This function finds the icon name for a given event label.
 * @param {string} eventLabel - The label for the event.
 * @returns {string} The icon name for the event.
 */

import { eventRecurrence } from "../constants/constants";

export const findEventRecurrenceIcon = (eventLabel) => {
  // match to correct label and return the icon name
  const eventIcon = eventRecurrence.find((item) => item.label === eventLabel);
  return eventIcon.iconName;
};
