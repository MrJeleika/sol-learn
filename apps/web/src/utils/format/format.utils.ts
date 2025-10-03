export const formatUnits = (value: bigint | number | string, decimals: number): string => {
  const bn = typeof value === 'bigint' ? value : BigInt(value)
  const negative = bn < 0n
  const abs = negative ? -bn : bn

  const base = 10n ** BigInt(decimals)
  if (decimals === 0) return `${negative ? '-' : ''}${abs.toString()}`

  const whole = abs / base
  let fraction = (abs % base).toString().padStart(decimals, '0')

  fraction = fraction.replace(/0+$/g, '')

  if (fraction.length === 0) {
    return `${negative ? '-' : ''}${whole.toString()}`
  }
  return `${negative ? '-' : ''}${whole.toString()}.${fraction}`
}

export const parseUnits = (value: string | number, decimals: number): bigint => {
  if (!Number.isInteger(decimals) || decimals < 0) throw new Error('Invalid decimals')
  let str = typeof value === 'number' ? String(value) : String(value)
  str = str.trim()
  if (str.length === 0) throw new Error('Invalid value')

  let negative = false
  if (str[0] === '+' || str[0] === '-') {
    negative = str[0] === '-'
    str = str.slice(1)
  }

  if (!/^\d*(?:\.\d*)?$/.test(str)) throw new Error('Invalid decimal string')

  let [whole = '0', fraction = ''] = str.split('.')
  if (whole.length === 0) whole = '0'

  if (fraction.length > decimals) throw new Error('Fractional component exceeds decimals')

  fraction = fraction.padEnd(decimals, '0')
  const combined = (whole === '' ? '0' : whole) + (decimals > 0 ? fraction : '')

  const normalized = combined.replace(/^0+(\d)/, '$1') || '0'
  let result = BigInt(normalized)
  if (negative && result !== 0n) result = -result
  return result
}
