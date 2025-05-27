/**
 * formatCurrency:
 * * If the number or string is not a number, it will return '$0.00'. "Juan" -> $0.00
 * * If the number or string is greater than 0.1, it will return two decimal places. 4500 -> $4,500.00
 * * If the number or string is less than 0.1, it will return two significant figure. 0.000344 -> $0.00034
 * * If the number or string is less than 10e-15, it will return 0. 0.000000000000000000123 -> $0.00
 */

export const formatCurrency = (value: number | string): string => {
  const valueAsNumber = Number(value)

  // If the value is not a number, return '$0.00'
  if (isNaN(valueAsNumber)) {
    return '$0.00'
  }

  // If the value is greater than or equal to 0.1, return two decimal places
  if (Math.abs(valueAsNumber) >= 0.1) {
    return valueAsNumber.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    })
  }

  // Otherwise, return two significant figure

  let zeros = 0 // Zeros before the first non-zero digit
  let tempValue = Math.abs(valueAsNumber)
  const MAX_ZEROS = 15 // Maximum number of zeros to check

  // Count the number of zeros before the first non-zero digit
  while (tempValue < 1 && zeros < MAX_ZEROS) {
    tempValue *= 10
    zeros++
  }

  // If there too many zeros, return '$0.00'
  if (zeros >= MAX_ZEROS) {
    return '$0.00'
  }

  // Return the value with the correct number of zeros
  return valueAsNumber.toLocaleString('en-US', {
    minimumFractionDigits: zeros + 1,
    maximumFractionDigits: zeros + 1,
    style: 'currency',
    currency: 'USD',
  })
}
