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
