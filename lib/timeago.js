import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

TimeAgo.addLocale(en);

const timeago = new TimeAgo("en-US");
// console.log("timeago -->", timeago);

export default timeago;
