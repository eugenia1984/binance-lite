export function formatNumberToCurrency(input: string): string {
  const num = parseFloat(input)
  if (isNaN(num)) return "Invalid input"

  if (num >= 1000000) {
      const millions = (num / 1000000).toFixed(2)
      return `${ millions } M$`
  } else {
      return `$ ${ num.toFixed(2) }`
  }
}
