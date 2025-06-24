import {
  addDays,
  endOfWeek,
  format,
  isWithinInterval,
  startOfWeek,
} from "date-fns"

/**
 * Returns an array of week objects (label and value) for all weeks from May 2025 onward.
 * Each value is an object with ISO strings for startDate and endDate.
 */
export function getWeeksFromMonthOnward(endDate = new Date(2025, 11, 31)) {
  const weeks = []
  const startYear = 2025
  const startMonth = 4 // May (0-indexed)

  const today = new Date() // Get current date and time
  const todayStartOfDay = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  ) // Start of today for robust comparison

  // Determine the effective start date for week generation
  // Start from May 1, 2025, but find the start of its week (Sunday)
  const initialStartDate = new Date(startYear, startMonth, 1)
  let current = startOfWeek(initialStartDate, { weekStartsOn: 0 }) // Sunday (0) as the start of the week

  const lastDate = endDate ? new Date(endDate) : today
  let currentWeek = { from: "", to: "" }

  while (current <= lastDate) {
    const weekStart = current
    const weekEnd = endOfWeek(current, { weekStartsOn: 0 })

    // Ensure we are considering weeks that start on or after May 2025
    // and do not go past the specified endDate (or today if not provided)
    if (
      weekStart.getFullYear() >= startYear &&
      (weekStart.getFullYear() > startYear ||
        weekStart.getMonth() >= startMonth)
    ) {
      // Check if today falls within this week interval
      const isCurrentWeek = isWithinInterval(todayStartOfDay, {
        start: weekStart,
        end: weekEnd,
      })

      const label: string =
        (isCurrentWeek ? "Current Week " : "Week ") +
        `(${format(weekStart, "MMM d")} - ${format(weekEnd, "MMM d, yyyy")})` // Added year to end date format for clarity

      const weekObj = {
        label,
        value: weekStart.toISOString() + "=" + weekEnd.toISOString(),
      }
      weeks.push(weekObj)

      if (isCurrentWeek) {
        currentWeek = {
          from: weekStart.toISOString(),
          to: weekEnd.toISOString(),
        }
      }
    }
    // Move to the next week
    current = addDays(current, 7)
  }
  return { weeks, currentWeek }
}
