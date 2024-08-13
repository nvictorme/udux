"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDate = formatDate;
exports.calcularEdad = calcularEdad;
exports.sanitizeString = sanitizeString;
exports.sanitizeNumber = sanitizeNumber;
const date_fns_tz_1 = require("date-fns-tz");
function formatDate(dateString) {
    // Define the time zone
    const timeZone = "America/New_York";
    // Convert the date string to a Date object in UTC
    const utcDate = (0, date_fns_tz_1.fromZonedTime)(dateString, timeZone);
    // Format the date to 'dd/MM/yyyy' in the 'America/New_York' time zone
    return (0, date_fns_tz_1.format)(utcDate, "dd/MM/yyyy", { timeZone });
}
function calcularEdad(fechaNacimiento) {
    const fechaNacimientoDate = new Date(fechaNacimiento);
    const edad = new Date().getFullYear() - fechaNacimientoDate.getFullYear();
    return edad;
}
// sanitize any string by removing html tags
// also removing any new lines, carriage returns, tabs
// and trimming it
function sanitizeString(str) {
    if (!str)
        return "";
    return str
        .replace(/<[^>]*>?/gm, "")
        .replace(/\r?\n|\r/g, "")
        .replace(/\t/g, "")
        .trim();
}
// sanitize any string allowing only numbers
// if it's NaN it will return null
function sanitizeNumber(str) {
    if (!str)
        return null;
    const num = parseInt(str.replace(/\D/g, ""), 10);
    return isNaN(num) ? null : num;
}
