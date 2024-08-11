"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDate = formatDate;
const date_fns_tz_1 = require("date-fns-tz");
function formatDate(dateString) {
    // Define the time zone
    const timeZone = "America/New_York";
    // Convert the date string to a Date object in UTC
    const utcDate = (0, date_fns_tz_1.fromZonedTime)(dateString, timeZone);
    // Format the date to 'dd/MM/yyyy' in the 'America/New_York' time zone
    return (0, date_fns_tz_1.format)(utcDate, "dd/MM/yyyy", { timeZone });
}
