import { PublicKey } from '@solana/web3.js'

function toSeedBytes(seed: unknown): Uint8Array {
  if (typeof seed === 'number') {
    const buf = new ArrayBuffer(8)
    const view = new DataView(buf)
    view.setUint32(0, seed >>> 0, true)
    view.setUint32(4, Math.floor(seed / 2 ** 32) >>> 0, true)
    return new Uint8Array(buf)
  }
  if (typeof seed === 'string') {
    try {
      const pk = new PublicKey(seed)
      return pk.toBytes()
    } catch {
      return new TextEncoder().encode(seed)
    }
  }
  if (seed instanceof Uint8Array) return seed
  return new TextEncoder().encode(String(seed ?? ''))
}

export function getPda(programIdStr: string, seeds: unknown[]) {
  try {
    const programId = new PublicKey(programIdStr)
    const seedBuffers = seeds.filter((s) => s !== undefined).map((s) => toSeedBytes(s))
    if (seedBuffers.length === 0) return { pda: '' }
    const [pda] = PublicKey.findProgramAddressSync(seedBuffers, programId)
    return { pda: pda.toBase58() }
  } catch {
    return { pda: '' }
  }
}
