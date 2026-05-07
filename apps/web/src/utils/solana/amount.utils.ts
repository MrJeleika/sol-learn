const normalizeDecimals = (value: unknown) => {
  const decimals = Number(value)
  if (!Number.isInteger(decimals) || decimals < 0) return undefined
  return decimals
}

const normalizeDecimalString = (value: unknown) => {
  const text = String(value ?? '')
    .trim()
    .replace(/,/g, '.')

  if (!text) return undefined

  const sign = text.startsWith('-') ? '-' : ''
  const unsigned = sign ? text.slice(1) : text
  if (!/^\d*(\.\d*)?$/.test(unsigned)) return undefined

  const [whole = '0', fraction = ''] = unsigned.split('.')
  const normalizedWhole = whole.replace(/^0+(?=\d)/, '') || '0'

  return {
    sign,
    whole: normalizedWhole,
    fraction,
  }
}

export const tokenAmountToRawAmount = (amountValue: unknown, decimalsValue: unknown) => {
  const decimals = normalizeDecimals(decimalsValue)
  const normalized = normalizeDecimalString(amountValue)
  if (decimals === undefined || !normalized) return ''

  const fraction = normalized.fraction.slice(0, decimals).padEnd(decimals, '0')
  const raw = BigInt(`${normalized.sign}${normalized.whole}${fraction}` || '0')
  return raw.toString()
}

export const rawAmountToTokenAmount = (rawAmountValue: unknown, decimalsValue: unknown) => {
  const decimals = normalizeDecimals(decimalsValue)
  if (decimals === undefined) return ''

  try {
    const rawText = String(rawAmountValue ?? '').trim()
    if (!rawText) return ''

    const raw = BigInt(rawText)
    const negative = raw < 0n
    const absolute = negative ? -raw : raw
    const absoluteText = absolute.toString().padStart(decimals + 1, '0')

    if (decimals === 0) return `${negative ? '-' : ''}${absoluteText}`

    const whole = absoluteText.slice(0, -decimals) || '0'
    const fraction = absoluteText.slice(-decimals).replace(/0+$/, '')

    return `${negative ? '-' : ''}${whole}${fraction ? `.${fraction}` : ''}`
  } catch {
    return ''
  }
}
