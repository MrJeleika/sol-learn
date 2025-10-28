import { useState, useEffect } from 'react'
import { CustomNode } from '../ui/custom-node'
import type { IdlNodeData, IdlNodeType, Idl } from '@/types/nodes/idl-node'
import { useTypedReactFlow } from '@/hooks/flow/use-typed-react-flow'
import type { NodeProps } from '@xyflow/react'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { getNodeStyles } from '@/utils/node/node-style.utils'
import { Check } from 'lucide-react'
import { toast } from 'sonner'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { PROGRAMS } from '@/constants/programs/programs'

export const IdlNode = (props: NodeProps<IdlNodeType>) => {
  const { updateNodeData } = useTypedReactFlow()
  const [idlJson, setIdlJson] = useState('')
  const [programId, setProgramId] = useState('')
  const [idl, setIdl] = useState<Idl | null>(null)

  const nodeStyles = getNodeStyles(props.type)

  useEffect(() => {
    if (idlJson) {
      try {
        const parsed = JSON.parse(idlJson) as Idl
        setIdl(parsed)

        if (parsed.metadata?.address && !programId) {
          setProgramId(parsed.metadata.address)
          updateNodeData<IdlNodeData>(props.id, { idlJson, idl: parsed, programId: parsed.metadata.address })
        } else {
          updateNodeData<IdlNodeData>(props.id, { idlJson, idl: parsed, programId })
        }
      } catch {
        setIdl(null)
        toast.error('Invalid IDL JSON')
        updateNodeData<IdlNodeData>(props.id, { idlJson, idl: null, programId })
      }
    } else {
      setIdl(null)
      updateNodeData<IdlNodeData>(props.id, { idlJson, idl: null, programId })
    }
  }, [idlJson, programId, props.id, updateNodeData])

  const handleProgramIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProgramId(e.target.value)
  }

  const handleIdlChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setIdlJson(e.target.value)
  }

  const handleProgramSelect = (value: string) => {
    const program = PROGRAMS.find((p) => p.programId === value)
    if (program) {
      setProgramId(program.programId)
      setIdlJson(JSON.stringify(program.idl, null, 2))
    }
  }

  return (
    <CustomNode {...props}>
      <div className="flex flex-col gap-2.5 px-4 py-2 pr-10">
        <div>
          <label className="text-[8px] text-foreground block">Default Programs</label>
          <Select onValueChange={handleProgramSelect}>
            <SelectTrigger color={nodeStyles.color}>
              <SelectValue placeholder="Select a program..." />
            </SelectTrigger>
            <SelectContent>
              {PROGRAMS.map((program) => (
                <SelectItem key={program.programId} value={program.programId}>
                  {program.idl.name || program.programId}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-[8px] text-foreground block">Program ID</label>
          <Input
            value={programId}
            onChange={handleProgramIdChange}
            placeholder="Enter program ID..."
            color={nodeStyles.color}
          />
        </div>
        <div>
          <label className="text-[8px] text-foreground block">IDL JSON</label>
          <Textarea
            value={idlJson}
            onChange={handleIdlChange}
            placeholder="Paste your IDL JSON here..."
            className="h-16"
            color={nodeStyles.color}
          />
        </div>
        {idl && (
          <div className="text-[8px] text-green-600">
            <Check className="inline size-2.5" /> IDL loaded: {idl.name} ({idl.instructions.length} instructions)
          </div>
        )}
      </div>
    </CustomNode>
  )
}
