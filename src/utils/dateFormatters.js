import { DateTime } from "luxon";

/*export const chatMessageFormat = (date) => {
  let month = String(date.getMonth() + 1).padStart(2, "0");
  let day = String(date.getDate()).padStart(2, "0");
  let year = date.getFullYear();

  let hours = String(date.getHours()).padStart(2, "0");
  let minutes = String(date.getMinutes()).padStart(2, "0");

  return `${day}/${month}/${year} - ${hours}:${minutes}`;
};*/

export const chatMessageFormat = (date) => {
  const diff = DateTime.now().diff(DateTime.fromJSDate(new Date(date)));
  return DateTime.now().minus(diff).toRelative();
}

export const chatListFormat = (date) => {
  let today = new Date();
  if (today.getDate() !== date.getDate()) {
    const formatDate = (date) => {
      let day = String(date.getDate()).padStart(2, "0");
      let month = String(date.getMonth() + 1).padStart(2, "0");
      return `${day}/${month}`;
    };
    let formattedDate = formatDate(date);
    return formattedDate;
  } else {
    const formatTime = (date) => {
      let hours = String(date.getHours()).padStart(2, "0");
      let minutes = String(date.getMinutes()).padStart(2, "0");
      return `${hours}:${minutes}`;
    };
    let formattedTime = formatTime(date);
    return formattedTime;
  }
};
