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

const initialNodes = [
  { id: 'n1', position: { x: 0, y: 0 }, data: { label: 'Node 1' }, className: 'react-flow__node-default' },
  { id: 'n2', position: { x: 0, y: 100 }, data: { label: 'Node 2' }, className: 'react-flow__node-default' },
  {
    id: 'n3',
    type: NodeTypeEnum.TEXT,
    position: { x: 0, y: 200 },
    data: { text: 'text' },
  },
  {
    id: 'n31',
    type: NodeTypeEnum.TEXT,
    position: { x: 100, y: 200 },
    data: { text: 'text' },
  },
  {
    id: 'n4',
    type: NodeTypeEnum.HASH,
    position: { x: 0, y: 300 },
    data: { label: 'Node 4' },
  },
  {
    id: 'n5',
    type: NodeTypeEnum.KEYPAIR,
    position: { x: 0, y: 400 },
    data: { label: 'Node 5' },
  },
  {
    id: 'n10',
    type: NodeTypeEnum.KEYPAIR,
    position: { x: 100, y: 400 },
    data: { label: 'Node 5' },
  },
  {
    id: 'n6',
    type: NodeTypeEnum.DISPLAY,
    position: { x: 0, y: 500 },
    data: { label: 'Node 6' },
  },
  {
    id: 'n7',
    type: NodeTypeEnum.NUMBER,
    position: { x: 0, y: 600 },
    data: { number: 0 },
  },
  {
    id: 'n8',
    type: NodeTypeEnum.VERIFY_SIGNATURE,
    position: { x: 0, y: 700 },
    data: { label: 'Node 8' },
  },
  {
    id: '9',
    type: NodeTypeEnum.SIGN,
    position: { x: 100, y: 700 },
    data: { label: 'Node 8' },
  },
  {
    id: '10',
    type: NodeTypeEnum.NETWORK,
    position: { x: 100, y: 800 },
    data: { label: 'Node 10' },
  },
  {
    id: '11',
    type: NodeTypeEnum.BALANCE,
    position: { x: 100, y: 900 },
    data: { label: 'Node 11' },
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
        selectionMode={SelectionMode.Partial}
        panOnDrag={false}
        className="bg-teal-50"
      >
        <MiniMap />
        <Controls />
      </ReactFlow>
    </div>
  )
}
