import { CustomNode } from '../ui/custom-node'
import type { ProgramInstructionsNodeType } from '@/types/nodes/program-instructions-node'
import type { ActionsFor, NodeTypeEnum } from '@/types/node'
import { useNodeActions } from '@/hooks/flow/use-node-actions'
import type { NodeProps } from '@xyflow/react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { getNodeStyles } from '@/utils/node/node-style.utils'
import { getIdlTypeString } from '@/utils/idl'
import { useProgramInstructionsNode } from '@/hooks/nodes/use-program-instructions-node'

export const ProgramInstructionsNode = (props: NodeProps<ProgramInstructionsNodeType>) => {
  const { idl, selectedInstruction, setSelectedInstruction, selectedInstructionDef, extraHandles } =
    useProgramInstructionsNode(props.id)

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
