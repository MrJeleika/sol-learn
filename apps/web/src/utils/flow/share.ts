import LZString from 'lz-string'
import type { FlowSnapshot } from '@/stores/flow-store'
import { FLOW_STORAGE_VERSION } from '@/stores/flow-store'

export const FLOW_HASH_KEY = 'flow'

interface SerializedFlow {
  v: number
  nodes: FlowSnapshot['nodes']
  edges: FlowSnapshot['edges']
  viewport?: FlowSnapshot['viewport']
}

export const encodeFlowToHash = (snapshot: FlowSnapshot): string => {
  const payload: SerializedFlow = {
    v: FLOW_STORAGE_VERSION,
    nodes: snapshot.nodes,
    edges: snapshot.edges,
    viewport: snapshot.viewport,
  }
  return LZString.compressToEncodedURIComponent(JSON.stringify(payload))
}

export const decodeFlowFromHash = (encoded: string): FlowSnapshot | null => {
  try {
    const json = LZString.decompressFromEncodedURIComponent(encoded)
    if (!json) return null
    const parsed = JSON.parse(json) as SerializedFlow
    if (parsed.v !== FLOW_STORAGE_VERSION) return null
    if (!Array.isArray(parsed.nodes) || !Array.isArray(parsed.edges)) return null
    return { nodes: parsed.nodes, edges: parsed.edges, viewport: parsed.viewport }
  } catch {
    return null
  }
}

export const readFlowFromLocation = (): FlowSnapshot | null => {
  if (typeof window === 'undefined') return null
  const hash = window.location.hash.startsWith('#') ? window.location.hash.slice(1) : window.location.hash
  if (!hash) return null
  const params = new URLSearchParams(hash)
  const encoded = params.get(FLOW_HASH_KEY)
  if (!encoded) return null
  return decodeFlowFromHash(encoded)
}

export const buildShareUrl = (snapshot: FlowSnapshot): string => {
  const encoded = encodeFlowToHash(snapshot)
  const url = new URL(window.location.href)
  url.hash = `${FLOW_HASH_KEY}=${encoded}`
  return url.toString()
}

export const clearFlowHash = () => {
  if (typeof window === 'undefined') return
  if (!window.location.hash) return
  const url = new URL(window.location.href)
  url.hash = ''
  window.history.replaceState(null, '', url.toString())
}
