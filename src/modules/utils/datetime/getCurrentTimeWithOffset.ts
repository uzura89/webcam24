export function getCurrentTimeWithOffset(gmtOffsetHour: number): {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
} {
  // Get the current date/time in GMT
  let now = new Date();

  // Convert the GMT offset from hours to milliseconds and add it to the current time
  let localTime = new Date(now.getTime() + gmtOffsetHour * 3600000);

  // Extract hours and minutes
  const years = localTime.getUTCFullYear();
  const months = localTime.getUTCMonth() + 1;
  const days = localTime.getUTCDate();
  const hours = localTime.getUTCHours();
  const minutes = localTime.getUTCMinutes();
  const seconds = localTime.getUTCSeconds();

  // Return the formatted time
  return {
    years,
    months,
    days,
    hours,
    minutes,
    seconds,
  };
}
