import { useCallback, useEffect } from 'react'
import {
  ReactFlow,
  addEdge,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  type Connection,
  type IsValidConnection,
  type Node,
  SelectionMode,
} from '@xyflow/react'
import { nodeMap } from '@/utils/node/node-map'
import { NodeTypeEnum } from '@/types/node'

const initialNodes: Node[] = [
  { id: 'default1', position: { x: 0, y: 0 }, type: NodeTypeEnum.TEXT, data: { text: 'Welcome to SOL Learn!' } },
  {
    id: 'default2',
    position: { x: 0, y: 70 },
    type: NodeTypeEnum.TEXT,
    data: { text: "I hope we've made your Solana learning journey much easier!" },
  },
]
const initialEdges = [{ id: 'n1-n2', source: 'n1', target: 'n2' }]

export default function Home() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  const onConnect = useCallback(
    (params: Connection) => {
      setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot))
      const all = Array.from(document.querySelectorAll('[data-handle-type]')) as HTMLElement[]
      for (const el of all) el.classList.remove('handle--dim', 'handle--highlight')
      document.body.removeAttribute('data-connecting-type')
    },
    [setEdges]
  )
  const isValidConnection: IsValidConnection = useCallback((edge) => {
    if (!('sourceHandle' in edge) || !('targetHandle' in edge)) return true
    const c = edge as Connection
    const sourceEl = document.querySelector(`[data-id="${c.sourceHandle}"]`) as HTMLElement | null
    const targetEl = document.querySelector(`[data-id="${c.targetHandle}"]`) as HTMLElement | null
    const srcType = sourceEl?.getAttribute('data-type')
    const tgtType = targetEl?.getAttribute('data-type')
    if (!srcType || !tgtType) return true
    return srcType === tgtType
  }, [])
  const onConnectStart = useCallback(
    (_: unknown, params: { handleId: string | null; nodeId: string | null; handleType: string | null }) => {
      if (!params?.handleId) return
      const sourceEl = document.querySelector(`[data-id="${params.handleId}"]`) as HTMLElement | null
      const srcType = sourceEl?.getAttribute('data-type')
      if (!srcType) return
      const allTargets = Array.from(document.querySelectorAll('[data-handle-type="target"]')) as HTMLElement[]
      for (const el of allTargets) {
        const tgtType = el.getAttribute('data-type')
        if (!tgtType) {
          el.classList.remove('handle--dim', 'handle--highlight')
          continue
        }
        if (tgtType === srcType) {
          el.classList.remove('handle--dim')
        } else {
          el.classList.add('handle--dim')
          el.classList.remove('handle--highlight')
        }
      }
    },
    []
  )
  const onConnectEnd = useCallback(() => {
    const all = Array.from(document.querySelectorAll('[data-handle-type]')) as HTMLElement[]
    for (const el of all) el.classList.remove('handle--dim', 'handle--highlight')
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === 'Delete' || e.key === 'Backspace') && e.target === document.body) {
        const selectedNodes = nodes.filter((node) => (node as Node).selected)
        if (selectedNodes.length > 0) {
          setNodes((nds) => nds.filter((node) => !(node as Node).selected))
          setEdges((eds) =>
            eds.filter((edge) => !selectedNodes.some((node) => node.id === edge.source || node.id === edge.target))
          )
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [nodes, setNodes, setEdges])

  return (
    <div style={{ width: '100vw', height: 'calc(100vh - 74px)' }}>
      <ReactFlow
        colorMode="dark"
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeMap}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onConnectStart={onConnectStart}
        onConnectEnd={onConnectEnd}
        isValidConnection={isValidConnection}
        fitView
        selectionOnDrag={true}
        selectionMode={SelectionMode.Full}
        panOnDrag={false}
        className="bg-teal-50"
      >
        <MiniMap />
        <Controls />
      </ReactFlow>
    </div>
  )
}
