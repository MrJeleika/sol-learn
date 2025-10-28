import { useEffect, useMemo, useState } from 'react'
import { Transaction } from '@solana/web3.js'
import { Position, useUpdateNodeInternals } from '@xyflow/react'
import type { Idl, IdlInstruction } from '@/types/nodes/idl-node'
import type { ProgramInstructionsNodeData } from '@/types/nodes/program-instructions-node'
import { useTypedNodesData } from '@/hooks/flow/use-typed-nodes-data'
import { useTypedReactFlow } from '@/hooks/flow/use-typed-react-flow'
import { getIdlTypeString, buildProgramInstruction } from '@/utils/idl'

export const useProgramInstructionsNode = (nodeId: string) => {
  const { updateNodeData } = useTypedReactFlow()
  const updateNodeInternals = useUpdateNodeInternals()

  const resolved = useTypedNodesData<'idl' | 'programId' | 'transactionIn'>(nodeId)

  const { idl, programId, transactionIn } = useMemo(() => {
    return {
      idl: (resolved.idl?.value as Idl | null) ?? null,
      programId: (resolved.programId?.value as string) ?? '',
      transactionIn: (resolved.transactionIn?.value as Transaction | null) ?? null,
    }
  }, [resolved])

  const [selectedInstruction, setSelectedInstruction] = useState<string>('')
  const [selectedInstructionDef, setSelectedInstructionDef] = useState<IdlInstruction | null>(null)

  useEffect(() => {
    if (idl && selectedInstruction) {
      const def = idl.instructions.find((i) => i.name === selectedInstruction)
      setSelectedInstructionDef(def ?? null)
    } else {
      setSelectedInstructionDef(null)
    }
  }, [idl, selectedInstruction])

  const extraHandles = useMemo(() => {
    const handles: {
      position: Position
      type: 'target' | 'source'
      dataField: string
      label: string
      dataType?: string
    }[] = []

    if (!selectedInstructionDef) return handles

    for (const account of selectedInstructionDef.accounts) {
      handles.push({
        position: Position.Left,
        type: 'target',
        dataField: `account_${account.name}`,
        label: `${account.name}${account.isSigner ? ' (signer)' : ''}${account.isMut ? ' (mut)' : ''}`,
        dataType: 'publicKey',
      })
    }

    for (const arg of selectedInstructionDef.args) {
      handles.push({
        position: Position.Left,
        type: 'target',
        dataField: `arg_${arg.name}`,
        label: `${arg.name}: ${getIdlTypeString(arg.type)}`,
        dataType: 'any',
      })
    }

    return handles
  }, [selectedInstructionDef])

  useEffect(() => {
    updateNodeInternals(nodeId)
  }, [extraHandles, nodeId, updateNodeInternals])

  useEffect(() => {
    const run = async () => {
      if (!idl || !programId || !selectedInstructionDef) {
        updateNodeData<ProgramInstructionsNodeData>(nodeId, {
          transactionOut: transactionIn ?? new Transaction(),
          selectedInstruction,
        })
        return
      }

      try {
        const resolvedMap = resolved as unknown as Record<string, { value: unknown }>

        const transaction = await buildProgramInstruction({
          programId,
          instructionDef: selectedInstructionDef,
          resolvedInputs: resolvedMap,
          baseTransaction: transactionIn,
        })

        updateNodeData<ProgramInstructionsNodeData>(nodeId, {
          transactionOut: transaction,
          selectedInstruction,
          idl,
          programId,
        })
      } catch (error) {
        console.error('Error building instruction:', error)
        updateNodeData<ProgramInstructionsNodeData>(nodeId, {
          transactionOut: transactionIn ?? new Transaction(),
          selectedInstruction,
        })
      }
    }
    run().catch(() => undefined)
  }, [nodeId, idl, programId, transactionIn, selectedInstruction, selectedInstructionDef, resolved, updateNodeData])

  return {
    idl,
    selectedInstruction,
    setSelectedInstruction,
    selectedInstructionDef,
    extraHandles,
  }
}
