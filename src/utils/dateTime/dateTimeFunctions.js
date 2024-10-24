export const getCurrentDateTime = () => {
  const currentDateTime = new Date();
  return currentDateTime;
};

export const convertDateTimeToLocale = (date) => {
  return date.toDate().toLocaleString("en-NZ");
};

export const filteredEvents = (eventList, currentDate) => {
  return eventList.filter((event) => event.eventDate.toDate() >= currentDate);
};

export const checkDate = (date) => {
  const currentDate = new Date().toLocaleString().split(",")[0];
  const eventDate = date.split(",")[0];
  return eventDate === currentDate;
};

export const sortedDates = (date) => {
  return date.sort((a, b) => a.eventDate.toDate() - b.eventDate.toDate());
};

export const recordSortedDates = (events) => {
  return events.sort((a, b) => b.eventDate.toDate().getTime() - a.eventDate.toDate().getTime());
};
