import MovingLine from '../ui/moving-line'
import { NodesText } from '../nodes/nodes-text'
import { NodesAnimation } from '../nodes/nodes-animation/index'
import { movingLineItems } from '../../constants/moving-line/moving-line-config'

export function Nodes() {
  return (
    <section className="bg-background min-h-screen sm:pt-12 pt-6 relative text-foreground">
      <div className="sm:p-12 p-6 flex flex-col flex-1 sm:gap-12 gap-6 max-lg:pb-[120px]">
        <h2 className="text-2xl font-bold">Overview</h2>
        <div className="flex lg:flex-row flex-col-reverse gap-12">
          <div className="flex w-full lg:w-1/2 flex-col gap-6">
            <NodesText />
          </div>
          <div className="flex lg:-translate-y-10 w-full lg:w-1/2 justify-end gap-8">
            <NodesAnimation />
          </div>
        </div>
      </div>
      <div className="absolute w-screen left-0 bottom-10 overflow-x-hidden">
        <MovingLine items={movingLineItems} />
      </div>
    </section>
  )
}
