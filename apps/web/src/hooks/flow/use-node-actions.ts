import type { ActionsFor, NodeType } from '@/types/node'
import type { NodeTypeEnum } from '@/types/node'
import type { NodeActionConfig } from '@/types/node-action'
import { getNodeConfig } from '@/utils/node/node-config-registry'

export const useNodeActions = <T extends ActionsFor<NodeTypeEnum>>(
  type: NodeType,
  actions: Record<T, () => void>
): NodeActionConfig[] => {
  const nodeConfig = getNodeConfig(type)

  return nodeConfig.actions.map((action) => {
    return {
      ...action,
      onClick: actions[action.label as T],
    }
  })
}
