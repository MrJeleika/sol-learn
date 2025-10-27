import { useEffect, useMemo } from 'react'
import { CustomNode } from '../ui/custom-node'
import type { PdaNodeData, PdaNodeType } from '@/types/nodes/pda-node'
import type { NodeTypeEnum, TargetFieldsForEnum } from '@/types/node'
import { useTypedNodesData } from '@/hooks/flow/use-typed-nodes-data'
import { useTypedReactFlow } from '@/hooks/flow/use-typed-react-flow'
import type { NodeProps } from '@xyflow/react'
import { Position, useUpdateNodeInternals } from '@xyflow/react'
import type { HandleConfig } from '@/types/node-handle'
import { getPda } from '@/utils/solana/pda.utils'

export const PdaNode = (props: NodeProps<PdaNodeType>) => {
  const { updateNodeData } = useTypedReactFlow()
  const updateNodeInternals = useUpdateNodeInternals()

  const resolved = useTypedNodesData<TargetFieldsForEnum<NodeTypeEnum.PDA>>(props.id)

  const seeds = useMemo(() => {
    const entries = Object.entries(resolved)
      .filter(([k]) => k.startsWith('seed#'))
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([, v]) => v?.value)
    return entries
  }, [resolved])

  const programId = useMemo(() => String(resolved.programId?.value ?? ''), [resolved])

  const extraHandles: HandleConfig[] = useMemo(() => {
    const existingSeedCount = seeds.length
    const handles: HandleConfig[] = []
    for (let i = 1; i < existingSeedCount + 1; i++) {
      handles.push({ position: Position.Left, type: 'target', dataField: `seed#${i}`, label: `Seed ${i + 1}` })
    }
    return handles
  }, [seeds])

  const { pda } = useMemo(() => {
    return getPda(programId, seeds)
  }, [programId, seeds])

  useEffect(() => {
    updateNodeInternals(props.id)
  }, [extraHandles, props.id, updateNodeInternals])

  useEffect(() => {
    if (pda) {
      updateNodeData<PdaNodeData>(props.id, {
        pda,
      })
    }
  }, [pda, programId, props.id, updateNodeData])

  return <CustomNode {...props} extraHandles={extraHandles} />
}
