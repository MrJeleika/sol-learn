import { useCallback } from 'react'
import { ReactFlow, addEdge, Controls, MiniMap, useNodesState, useEdgesState } from '@xyflow/react'
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
  const [nodes, , onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  const onConnect = useCallback((params) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)), [])
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        colorMode="dark"
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeMap}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        className="bg-teal-50"
      >
        <MiniMap />
        <Controls />
      </ReactFlow>
    </div>
  )
}
