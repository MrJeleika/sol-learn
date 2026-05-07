import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import {
  applyNodeChanges,
  applyEdgeChanges,
  type Node,
  type Edge,
  type NodeChange,
  type EdgeChange,
  type Viewport,
} from '@xyflow/react'
import { NodeTypeEnum } from '@/types/node'

export const FLOW_STORAGE_KEY = 'sol-learn:flow'
export const FLOW_STORAGE_VERSION = 1

const defaultNodes: Node[] = [
  { id: 'default1', position: { x: 0, y: 0 }, type: NodeTypeEnum.TEXT, data: { text: 'Welcome to SOL Learn!' } },
  {
    id: 'default2',
    position: { x: 0, y: 70 },
    type: NodeTypeEnum.TEXT,
    data: { text: "I hope we've made your Solana learning journey much easier!" },
  },
]
const defaultEdges: Edge[] = []

export interface FlowSnapshot {
  nodes: Node[]
  edges: Edge[]
  viewport?: Viewport
}

interface FlowState extends FlowSnapshot {
  onNodesChange: (changes: NodeChange[]) => void
  onEdgesChange: (changes: EdgeChange[]) => void
  setNodes: (updater: Node[] | ((nodes: Node[]) => Node[])) => void
  setEdges: (updater: Edge[] | ((edges: Edge[]) => Edge[])) => void
  setViewport: (viewport: Viewport) => void
  replaceFlow: (snapshot: FlowSnapshot) => void
  resetFlow: () => void
}

export const useFlowStore = create<FlowState>()(
  persist(
    (set) => ({
      nodes: defaultNodes,
      edges: defaultEdges,
      viewport: undefined,
      onNodesChange: (changes) => set((s) => ({ nodes: applyNodeChanges(changes, s.nodes) })),
      onEdgesChange: (changes) => set((s) => ({ edges: applyEdgeChanges(changes, s.edges) })),
      setNodes: (updater) =>
        set((s) => ({ nodes: typeof updater === 'function' ? (updater as (n: Node[]) => Node[])(s.nodes) : updater })),
      setEdges: (updater) =>
        set((s) => ({ edges: typeof updater === 'function' ? (updater as (e: Edge[]) => Edge[])(s.edges) : updater })),
      setViewport: (viewport) => set({ viewport }),
      replaceFlow: (snapshot) =>
        set({ nodes: snapshot.nodes, edges: snapshot.edges, viewport: snapshot.viewport }),
      resetFlow: () => set({ nodes: defaultNodes, edges: defaultEdges, viewport: undefined }),
    }),
    {
      name: FLOW_STORAGE_KEY,
      version: FLOW_STORAGE_VERSION,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ nodes: state.nodes, edges: state.edges, viewport: state.viewport }),
    }
  )
)
