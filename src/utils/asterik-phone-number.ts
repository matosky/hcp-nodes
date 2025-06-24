export function hideNumber(num: string): string {
  if (!num) return "";
  const len = num.length;
  // Always leave last 2 digits visible. For 13-digit numbers show first 5 digits.
  const visibleCount = len === 13 ? 5 : Math.min(5, len - 2);
  const maskedCount = len - visibleCount - 2;
  return (
    num.substring(0, visibleCount) +
    "*".repeat(maskedCount) +
    num.substring(len - 2)
  );
}