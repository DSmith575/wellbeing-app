export const getCurrentDateTime = () => {
  const currentDateTime = new Date();
  return currentDateTime;
};

export const convertDateTimeToLocale = (date) => {
  return date.toDate().toLocaleString("en-NZ");
};

export const splitDateGetTime = (date) => {
  return date.toDate().toLocaleTimeString("en-NZ");
};

export const splitDateGetCalendarDate = (date) => {
  const calendarDate = date.toDate().toDateString("en-NZ").split(",")[0].split(" ");
  console.log(calendarDate);

  const calendarDates = {
    day: calendarDate[0],
    month: calendarDate[1],
    date: calendarDate[2],
    year: calendarDate[3],
  };

  return calendarDates;

  // return calendarDates;
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
