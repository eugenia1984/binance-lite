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

/**
 * To format the price with only two decimals
 * @param input the string that represent the price with more that two decimals
 * @returns 
 */
export function formatCurrencyToTwoDecimals(input: string): string {
  const num = parseFloat(input)
  if (isNaN(num)) return "Invalid input"

  return `${ num.toFixed(2) }`
}

/**
 * Having the current price of the coint and the amount to buy/sell,
 * we can add a fee(optional) and calculate the total
 * @param currentPrice the price of the coin per unit
 * @param amount the amount of coin to buy or sell
 * @param add (opctional) the fee that is adding per transaction
 * @returns 
 */
export function getAmountToPaid(
  currentPrice: string,
  amount: string,
  add?: string
): string {
  const numberCurrentPrice = parseFloat(currentPrice)
  const numberAmount = parseFloat(amount)
  return add ?
    (numberCurrentPrice * numberAmount + +add).toFixed(2)
    : (numberCurrentPrice * numberAmount).toFixed(2)
}

export function getSrcImg(input: string): string | null {
  const indexOfPng = input.lastIndexOf('.png')
  if (indexOfPng !== -1) {
    return input.substring(0, indexOfPng + 4) // add 4 to include ".png"
  }
  return null // if there is no ".png" retunr devolvemos null
}

export function getTheLastTwoNumbersOfCurrentYear(): string {
  const thisYear = (new Date()).getFullYear()
  return thisYear.toString().substring(2)
}
