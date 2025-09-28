import { Handle, Position } from '@xyflow/react'
import { useCallback } from 'react'

type Props = {}

export const TextNode = (props: Props) => {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value)
  }, [])
  return (
    <div className="text-updater-node">
      <Handle type="source" position={Position.Top} />
      <div className="p-2">
        <label htmlFor="text">Text:</label>
        <input id="text" name="text" onChange={onChange} className="nodrag border" />
      </div>
      <Handle type="target" position={Position.Bottom} />
    </div>
  )
}
