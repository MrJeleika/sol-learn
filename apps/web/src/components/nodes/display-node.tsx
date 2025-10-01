import { CustomNode } from '../ui/custom-node'
import { useEffect, useMemo } from 'react'
import { useTypedReactFlow } from '@/hooks/flow/use-typed-react-flow'
import { useTypedNodesData } from '@/hooks/flow/use-typed-nodes-data'
import type { NodeTypeEnum, TargetFieldsForEnum } from '@/types/node'
import type { DisplayNodeData, DisplayNodeType } from '@/types/nodes/display-node'
import { Copy } from '../ui/copy'

export const DisplayNode = (props: DisplayNodeType) => {
  const { updateNodeData } = useTypedReactFlow()
  const resolved = useTypedNodesData<TargetFieldsForEnum<NodeTypeEnum.display>>(props.id)

  const inputData = useMemo(() => String(resolved.input?.value ?? ''), [resolved])

  useEffect(() => {
    updateNodeData<DisplayNodeData>(props.id, { text: inputData })
  }, [inputData, props.id, updateNodeData])

  return (
    <CustomNode {...props}>
      <Copy data={inputData} />
    </CustomNode>
  )
}
