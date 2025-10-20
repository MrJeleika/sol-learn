import { useEffect, useMemo, useState } from 'react'
import { CustomNode } from '../ui/custom-node'
import type { ProgramInstructionsNodeData, ProgramInstructionsNodeType } from '@/types/nodes/program-instructions-node'
import type { Idl, IdlInstruction } from '@/types/nodes/idl-node'
import { useTypedNodesData } from '@/hooks/flow/use-typed-nodes-data'
import type { ActionsFor, NodeTypeEnum } from '@/types/node'
import { useTypedReactFlow } from '@/hooks/flow/use-typed-react-flow'
import { useNodeActions } from '@/hooks/flow/use-node-actions'
import { Transaction } from '@solana/web3.js'
import type { NodeProps } from '@xyflow/react'
import { Position } from '@xyflow/react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { getNodeStyles } from '@/utils/node/node-style.utils'
import { getIdlTypeString, buildProgramInstruction } from '@/utils/idl'

export const ProgramInstructionsNode = (props: NodeProps<ProgramInstructionsNodeType>) => {
  const { updateNodeData } = useTypedReactFlow()

  const resolved = useTypedNodesData<'idl' | 'programId' | 'transactionIn'>(props.id)

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

    // Add argument handles
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

  // Build transaction when inputs change
  useEffect(() => {
    const run = async () => {
      if (!idl || !programId || !selectedInstructionDef) {
        updateNodeData<ProgramInstructionsNodeData>(props.id, {
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

        updateNodeData<ProgramInstructionsNodeData>(props.id, {
          transactionOut: transaction,
          selectedInstruction,
          idl,
          programId,
        })
      } catch (error) {
        console.error('Error building instruction:', error)
        updateNodeData<ProgramInstructionsNodeData>(props.id, {
          transactionOut: transactionIn ?? new Transaction(),
          selectedInstruction,
        })
      }
    }
    run().catch(() => undefined)
  }, [props.id, idl, programId, transactionIn, selectedInstruction, selectedInstructionDef, resolved, updateNodeData])

  const actions = useNodeActions<ActionsFor<NodeTypeEnum.PROGRAM_INSTRUCTIONS>>(props.type, {})

  return (
    <CustomNode {...props} actions={actions} extraHandles={extraHandles}>
      <div className="flex flex-col gap-1.5 pl-16 pr-10 py-2 min-w-[300px]">
        {!idl && <div className="text-[8px] text-foreground italic">Connect an IDL node to begin</div>}

        {idl && (
          <>
            <div className="text-[8px] text-foreground mb-1">
              Program: <span className="font-mono">{idl.name}</span>
            </div>

            <div>
              <label className="text-[8px] text-foreground block mb-1">Select Instruction</label>
              <Select value={selectedInstruction} onValueChange={setSelectedInstruction}>
                <SelectTrigger color={getNodeStyles(props.type).color}>
                  <SelectValue placeholder="Select instruction" />
                </SelectTrigger>
                <SelectContent>
                  {idl.instructions.map((instruction) => (
                    <SelectItem key={instruction.name} value={instruction.name}>
                      {instruction.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedInstructionDef && (
              <div className="mt-2 text-[8px] space-y-2">
                {selectedInstructionDef.accounts.length > 0 && (
                  <div className="pt-2">
                    <div className="font-semibold text-foreground mb-1">Accounts:</div>
                    <div className="space-y-1 pl-2">
                      {selectedInstructionDef.accounts.map((account) => (
                        <div key={account.name} className="text-foreground">
                          • {account.name}
                          {account.isSigner && <span className="text-orange-600"> (signer)</span>}
                          {account.isMut && <span className="text-blue-600"> (mutable)</span>}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedInstructionDef.args.length > 0 && (
                  <div className="pt-2">
                    <div className="font-semibold text-foreground mb-1">Arguments:</div>
                    <div className="space-y-1 pl-2">
                      {selectedInstructionDef.args.map((arg) => (
                        <div key={arg.name} className="text-foreground">
                          • {arg.name}: <span className="font-mono text-[8px]">{getIdlTypeString(arg.type)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </CustomNode>
  )
}
