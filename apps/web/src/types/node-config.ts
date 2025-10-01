import type { NodeActionConfigBase } from './node-action'
import type { HandleConfig } from './node-handle'

export type NodeConfig = {
  label: string
  handles: HandleConfig[]
  actions: NodeActionConfigBase[]
}
