export const formatNumber = (value: number | string | null): string | null => {
  if (!value) return null

  const formattedValue = new Intl.NumberFormat('en-US').format(Number(value))
  return isNaN(Number(value)) ? '-' : formattedValue.split('.')[0]
}
