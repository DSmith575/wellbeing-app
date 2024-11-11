/**
 * Returns the current date and time.
 * @returns {Date} The current date and time.
 */
export const getCurrentDateTime = () => {
  return new Date().toLocaleString("en-NZ");
};

/**
 * Converts a given date to the locale-specific string representation.
 * @param {Date} date - The date to be converted.
 * @returns {string} The locale-specific string representation of the date.
 */
export const convertDateTimeToLocale = (date) => {
  console.log("checkToday", date);
  return date.toDate().toLocaleString("en-NZ");
};

/**
 * Splits a given date and returns the time portion in the specified format.
 * @param {Date} date - The date to be split.
 * @returns {string} The time portion of the date in the specified format.
 */
export const splitDateGetTime = (date) => {
  return date.toDate().toLocaleTimeString("en-NZ", { hour: "2-digit", minute: "2-digit" }).toUpperCase();
};

/**
 * Splits a given date and returns the calendar date components.
 * @param {Date} date - The date to be split.
 * @returns {Object} An object containing the day, month, date, and year components of the calendar date.
 */
export const splitDateGetCalendarDate = (date) => {
  const calendarDate = date.toDate().toDateString("en-NZ").split(",")[0].split(" ");

  const calendarDates = {
    day: calendarDate[0],
    month: calendarDate[1],
    date: calendarDate[2],
    year: calendarDate[3],
  };

  return calendarDates;
};

/**
 * Filters an array of events based on the event date being greater than or equal to the current date.
 * @param {Array} eventList - The array of events to be filtered.
 * @param {Date} currentDate - The current date.
 * @returns {Array} The filtered array of events.
 */
export const filteredEvents = (eventList, currentDate) => {
  return eventList.filter((event) => event.eventEndDate.toDate() >= currentDate);
};

/**
 * Checks if a given date is the current date.
 * @param {string} date - The date to be checked.
 * @returns {boolean} True if the given date is the current date, false otherwise.
 */
export const checkDate = (date) => {
  const currentDate = new Date().toLocaleString();
  const eventDate = date;
  console.log("curentDate", currentDate);
  console.log("eventDate", eventDate);
  return eventDate === currentDate;
};

/**
 * Sorts an array of dates in descending order based on the event date.
 * @param {Array} date - The array of dates to be sorted.
 * @returns {Array} The sorted array of dates.
 */
export const sortedDates = (date) => {
  return date.sort((a, b) => b.eventDate.toDate() - a.eventDate.toDate());
};
