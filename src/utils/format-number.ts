export function formatNumberWithCommasAndSuffix(num?: number) {
  if (typeof num !== "number" || isNaN(num)) return "0"
  if (num === 0) return "0"

  const suffix = ["", "K", "M", "B", "T"]
  const tier = Math.floor(Math.log10(Math.abs(num)) / 3)

  if (tier < 1) return num.toLocaleString()

  const suffixChar = suffix[tier] || ""
  const scale = Math.pow(10, tier * 3)
  const scaled = num / scale

  return scaled.toFixed(1).replace(/\.0$/, "") + suffixChar
}



export function formatNumberWithCommas(numStr: number) {
  // Remove any existing commas and convert to number
  const num = parseFloat(numStr.toString().replace(/,/g, ""));

  // Check if the conversion resulted in a valid number
  if (isNaN(num)) {
    return numStr; // return original if not a number
  }

  // Format with commas
  return num.toLocaleString("en-US");
}