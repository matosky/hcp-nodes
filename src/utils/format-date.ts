import { format } from "date-fns";

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  return date.toLocaleDateString("en-US", options);
};

export const formatISOtoDateAndTime = (date: string, returnType = "both") => {
  const formatted = format(new Date(date), "MMM dd, yyyy | hh:mmaaa");

  if (returnType === "both") return formatted;
  else if (returnType === "date") {
    return formatted.split(" | ")[0];
  } else if (returnType === "time") {
    return formatted.split(" | ")[1];
  }
  return formatted; // Fallback to both if no valid returnType is provided
};

export const ISOTODateFormat = (date: string | Date) => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  const localFormatted =
    dateObj?.getFullYear() +
    "-" +
    String(dateObj?.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(dateObj?.getDate()).padStart(2, "0");

  return localFormatted;
};


export const formatDateWithFallback = (
  dateString: string | Date | undefined | null,
  style: string = "MMM dd, yyyy"
): string => {
  if (!dateString) {
    return "N/A"; // No date provided
  }
  const date = new Date(dateString);
  // Check if the date is valid AND not the year 1 (the problematic default)
  if (isNaN(date.getTime()) || date.getFullYear() === 1) {
    return "N/A"; // Invalid date or default 0001-01-01
  }
  return format(date, style);
};