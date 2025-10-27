import { CustomNode } from '../ui/custom-node'
import { useTypedReactFlow } from '@/hooks/flow/use-typed-react-flow'
import type { NetworkNodeData, NetworkNodeType } from '@/types/nodes/network-node'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { NetworkEnum } from '@/types/network'
import type { NodeProps } from '@xyflow/react'
import { getNodeStyles } from '@/utils/node/node-style.utils'

export const NetworkNode = (props: NodeProps<NetworkNodeType>) => {
  const { updateNodeData } = useTypedReactFlow()

  const handleChange = (value: string) => {
    updateNodeData<NetworkNodeData>(props.id, { network: value as NetworkEnum })
  }

  const nodeStyles = getNodeStyles(props.type)

  return (
    <CustomNode {...props}>
      <Select onValueChange={handleChange}>
        <SelectTrigger color={nodeStyles.color}>
          <SelectValue className="" placeholder="Select a network" />
        </SelectTrigger>
        <SelectContent>
          {Object.values(NetworkEnum).map((network) => (
            <SelectItem key={network} value={network}>
              {network}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </CustomNode>
  )
}
