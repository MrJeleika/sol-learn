import { useMemo } from 'react'
import { useNodeConnections, useNodesData, type Node } from '@xyflow/react'
import type { DataTypeId } from '@/types/node-handle'
import { resolveByType } from '@/utils/node/data-resolvers'
import type { NodeTypeEnum, TargetFieldsForEnum } from '@/types/node'

export type ResolvedConnection = {
  sourceId?: string
  sourceHandleId?: string
  dataField?: string
  dataType?: DataTypeId
  value: unknown
}

function parseHandleMeta(
  handleId: string,
  nodeId: string
): {
  dataField: string
  dataType: DataTypeId
} {
  // Convention from CustomNode: id = `${nodeId}-${dataField}-${dataType}-${position}`
  // Example: n3-text-string
  const rest = handleId.slice((nodeId + '-').length)
  const parts = rest.split('-')
  const dataField = parts[0]
  const dataTypeRaw = parts.slice(1, 2).join('-')
  let dataType: DataTypeId = dataTypeRaw as DataTypeId
  // Optional: basic normalization for common types
  if (dataTypeRaw === 'json') dataType = { kind: 'json' }
  return { dataField, dataType }
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
      const { dataField, dataType } = parseHandleMeta(connection.sourceHandle!, connection.source)
      const raw = dataField && node ? (node.data as Record<string, unknown>)?.[dataField] : undefined
      const value = resolveByType(dataType, raw)

      const key = parseHandleMeta(connection.targetHandle!, connection.target).dataField as T

      record[key] = {
        sourceId: connection.source,
        sourceHandleId: connection.sourceHandle!,
        dataField,
        dataType,
        value,
      }
    }
    return record
  }, [connections, nodesById])
}
