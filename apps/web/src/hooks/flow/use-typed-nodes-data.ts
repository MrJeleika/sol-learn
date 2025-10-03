import { useMemo } from 'react'
import { useNodeConnections, useNodesData, type Node } from '@xyflow/react'
import type { NodeTypeEnum, TargetFieldsForEnum } from '@/types/node'

export type ResolvedConnection<V = unknown> = {
  sourceId?: string
  sourceHandleId?: string
  dataField?: string
  value: V
}

function parseHandleMeta(handleId: string, nodeId: string): string {
  // Convention from CustomNode: id = `${nodeId}-${dataField}-${position}`
  // Example: n3-text-left
  const rest = handleId.slice((nodeId + '-').length)
  const parts = rest.split('-')
  const dataField = parts[0]

  return dataField
}

export function useTypedNodesData<T extends TargetFieldsForEnum<NodeTypeEnum>>(id: string) {
  const connections = useNodeConnections({ handleType: 'target', id })

  const sourceIds = useMemo(() => {
    return (connections ?? []).map((c) => c.source).filter((id): id is string => Boolean(id))
  }, [connections])

  const nodes = useNodesData<Node>(sourceIds)

  const nodesById = useMemo(() => {
    const map = new Map<string, Pick<Node, 'id' | 'type' | 'data'>>()
    for (const n of nodes) map.set(n.id, n)
    return map
  }, [nodes])

  return useMemo(() => {
    const record: Partial<Record<T, ResolvedConnection>> = {}
    for (const connection of connections) {
      if (!connection.source || !connection.target) continue
      const node = connection.source ? (nodesById.get(connection.source) ?? null) : null
      const dataField = parseHandleMeta(connection.sourceHandle!, connection.source)
      const raw = dataField && node ? node.data?.[dataField] : undefined

      const key = parseHandleMeta(connection.targetHandle!, connection.target) as T

      record[key] = {
        sourceId: connection.source,
        sourceHandleId: connection.sourceHandle!,
        dataField,
        value: raw,
      }
    }
    return record
  }, [connections, nodesById])
}
