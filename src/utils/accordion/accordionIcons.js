import { eventRecurrence } from "../constants/constants";

export const findEventRecurrenceIcon = (eventLabel) => {
  // match to correct label and return the icon name
  const eventIcon = eventRecurrence.find((item) => item.label === eventLabel);
  return eventIcon.iconName;
};
