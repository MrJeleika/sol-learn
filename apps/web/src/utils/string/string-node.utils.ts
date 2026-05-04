import bs58 from 'bs58'

export type StringEncoding = 'base64' | 'base58' | 'hex'

const textEncoder = new TextEncoder()
const textDecoder = new TextDecoder()

export const toText = (value: unknown) => {
  if (value === undefined || value === null) return ''
  if (typeof value === 'string') return value
  if (value instanceof Uint8Array) return textDecoder.decode(value)
  if (typeof value === 'object') return JSON.stringify(value)
  return String(value)
}

export const toNumber = (value: unknown, fallback = 0) => {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : fallback
}

export const getUtf8ByteLength = (value: string) => textEncoder.encode(value).length

const bytesToHex = (bytes: Uint8Array) => Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('')

const hexToBytes = (hex: string) => {
  const normalized = hex.trim().replace(/^0x/i, '')
  if (!normalized || normalized.length % 2 !== 0 || /[^0-9a-f]/i.test(normalized)) return null

  const bytes = new Uint8Array(normalized.length / 2)
  for (let i = 0; i < normalized.length; i += 2) {
    bytes[i / 2] = Number.parseInt(normalized.slice(i, i + 2), 16)
  }
  return bytes
}

const bytesToBase64 = (bytes: Uint8Array) => {
  let binary = ''
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte)
  })
  return btoa(binary)
}

const base64ToBytes = (value: string) => {
  try {
    const binary = atob(value.trim())
    return Uint8Array.from(binary, (char) => char.charCodeAt(0))
  } catch {
    return null
  }
}

export const encodeString = (value: string, encoding: StringEncoding) => {
  const bytes = textEncoder.encode(value)

  switch (encoding) {
    case 'base64':
      return bytesToBase64(bytes)
    case 'base58':
      return bs58.encode(bytes)
    case 'hex':
      return bytesToHex(bytes)
  }
}

export const decodeString = (value: string, encoding: StringEncoding) => {
  try {
    switch (encoding) {
      case 'base64': {
        const bytes = base64ToBytes(value)
        return bytes ? textDecoder.decode(bytes) : ''
      }
      case 'base58':
        return textDecoder.decode(bs58.decode(value.trim()))
      case 'hex': {
        const bytes = hexToBytes(value)
        return bytes ? textDecoder.decode(bytes) : ''
      }
    }
  } catch {
    return ''
  }
}
