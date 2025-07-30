import { isEmpty } from "lodash";

function getOpenOrClose(openingHours) {
  if (isEmpty(openingHours)) return null;
  // Get the current day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
  const currentDayOfWeek = new Date().getDay();

  // Get the current time as "HH:MMAM" or "HH:MMPM" format
  const currentTime = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  // Get the opening hours for the current day
  const currentOpeningHours =
    openingHours[Object.keys(openingHours)[currentDayOfWeek]];

  if (currentOpeningHours) {
    const fromTime = currentOpeningHours.from;
    const toTime = currentOpeningHours.to;

    if (currentTime >= fromTime && currentTime <= toTime) {
      return true;
    }
  }

  return false;
}

export { getOpenOrClose };
