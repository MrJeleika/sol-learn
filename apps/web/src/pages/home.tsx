import { useState, useCallback } from 'react'
import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge, Controls, MiniMap } from '@xyflow/react'
import { nodeMap } from '@/utils/node/node-map'

const initialNodes = [
  { id: 'n1', position: { x: 0, y: 0 }, data: { label: 'Node 1' }, className: 'react-flow__node-default' },
  { id: 'n2', position: { x: 0, y: 100 }, data: { label: 'Node 2' }, className: 'react-flow__node-default' },
  {
    id: 'n3',
    type: 'text',
    position: { x: 0, y: 200 },
    data: { text: 'text' },
  },
  {
    id: 'n4',
    type: 'hash',
    position: { x: 0, y: 300 },
    data: { label: 'Node 4' },
  },
]
const initialEdges = [{ id: 'n1-n2', source: 'n1', target: 'n2' }]

export default function Home() {
  const [nodes, setNodes] = useState(initialNodes)
  const [edges, setEdges] = useState(initialEdges)

  const onNodesChange = useCallback(
    (changes) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    []
  )
  const onEdgesChange = useCallback(
    (changes) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    []
  )
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
