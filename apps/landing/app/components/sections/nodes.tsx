import MovingLine from '../ui/moving-line'
import { NodesText } from '../nodes/nodes-text'
import { NodesAnimation } from '../nodes/nodes-animation/index'

export function Nodes() {
  return (
    <section className="bg-background min-h-screen relative text-foreground">
      <div className="p-12 flex flex-col flex-1 gap-12">
        <h2 className="text-2xl font-bold">Overview</h2>
        <div className="flex gap-12">
          <div className="flex w-1/2 flex-col gap-6">
            <NodesText />
          </div>
          <div className="flex -translate-y-10 w-1/2 justify-end gap-8">
            <NodesAnimation />
          </div>
        </div>
      </div>
      <div className="absolute w-screen left-0 bottom-10 overflow-x-hidden">
        <MovingLine
          items={[
            { label: 'Node 1', text: 'Node 1', color: '#24ffa7' },
            { label: 'Node 2', text: 'Node 2', color: '#519ed4' },
            { label: 'Node 3', text: 'Node 3', color: '#9945ff' },
          ]}
        />
      </div>
    </section>
  )
}
