import { useReactFlow, type XYPosition } from '@xyflow/react'
import { NodeTypeEnum, type NodeType } from '@/types/node'
import { useCallback } from 'react'
import { generateNodeId } from '@/utils/crypto/crypto.utils'
import { DraggableNode } from './draggable-node'

export const NodeSelect = () => {
  const { screenToFlowPosition, setNodes } = useReactFlow()

  const handleNodeDrop = useCallback(
    (nodeType: NodeType, screenPosition: XYPosition) => {
      const flow = document.querySelector('.react-flow')
      const flowRect = flow?.getBoundingClientRect()
      const isInFlow =
        flowRect &&
        screenPosition.x >= flowRect.left &&
        screenPosition.x <= flowRect.right &&
        screenPosition.y >= flowRect.top &&
        screenPosition.y <= flowRect.bottom

      // Create a new node and add it to the flow
      if (isInFlow) {
        const position = screenToFlowPosition(screenPosition)

        const newNode = {
          id: generateNodeId(),
          type: nodeType,
          position,
          data: { ads: 'asd' },
        }

        setNodes((nds) => nds.concat(newNode))
      }
    },
    [setNodes, screenToFlowPosition]
  )

  return (
    <div className="absolute z-50 pointer-events-none top-0 left-0 h-full w-[100px] flex flex-col gap-2 p-2">
      <div className="relative">
        <DraggableNode type={NodeTypeEnum.KEYPAIR} onDrop={handleNodeDrop} />
      </div>
      <div className="relative">
        <DraggableNode type={NodeTypeEnum.NETWORK} onDrop={handleNodeDrop} />
      </div>
      <div className="relative">
        <DraggableNode type={NodeTypeEnum.TRANSACTION_VIEW} onDrop={handleNodeDrop} />
      </div>
      <div className="relative">
        <DraggableNode type={NodeTypeEnum.PDA} onDrop={handleNodeDrop} />
      </div>
      <div className="relative">
        <DraggableNode type={NodeTypeEnum.TRANSACTION_BUILDER} onDrop={handleNodeDrop} />
      </div>
      <div className="relative">
        <DraggableNode type={NodeTypeEnum.INSTRUCTIONS} onDrop={handleNodeDrop} />
      </div>
      <div className="relative">
        <DraggableNode type={NodeTypeEnum.TRANSACTION} onDrop={handleNodeDrop} />
      </div>
      <div className="relative">
        <DraggableNode type={NodeTypeEnum.IDL} onDrop={handleNodeDrop} />
      </div>
      <div className="relative">
        <DraggableNode type={NodeTypeEnum.PROGRAM_INSTRUCTIONS} onDrop={handleNodeDrop} />
      </div>
    </div>
  )
}
