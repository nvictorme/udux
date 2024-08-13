import { fromZonedTime, format } from "date-fns-tz";

export function formatDate(dateString: string): string {
  // Define the time zone
  const timeZone = "America/New_York";

  // Convert the date string to a Date object in UTC
  const utcDate = fromZonedTime(dateString, timeZone);

  // Format the date to 'dd/MM/yyyy' in the 'America/New_York' time zone
  return format(utcDate, "dd/MM/yyyy", { timeZone });
}

export function calcularEdad(fechaNacimiento: string): number {
  const fechaNacimientoDate = new Date(fechaNacimiento);
  const edad = new Date().getFullYear() - fechaNacimientoDate.getFullYear();
  return edad;
}

// sanitize any string by removing html tags
// also removing any new lines, carriage returns, tabs
// and trimming it
export function sanitizeString(str: string): string {
  if (!str) return "";
  return str
    .replace(/<[^>]*>?/gm, "")
    .replace(/\r?\n|\r/g, "")
    .replace(/\t/g, "")
    .trim();
}

// sanitize any string allowing only numbers
// if it's NaN it will return null
export function sanitizeNumber(str: string): number | null {
  if (!str) return null;
  const num = parseInt(str.replace(/\D/g, ""), 10);
  return isNaN(num) ? null : num;
}
