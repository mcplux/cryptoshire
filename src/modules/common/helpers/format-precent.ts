export const formatPercent = (value: number | string): string => {
  const formattedValue = Number(value).toFixed(3) + '%'

  return formattedValue
}
