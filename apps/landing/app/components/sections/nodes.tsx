'use client'

import { useState } from 'react'
import MovingLine from '../ui/moving-line'
import { MovingLineItem } from '@/app/types/moving-line'
import { NodesText } from '../nodes/nodes-text'

export function Nodes() {
  const [hoveredItem, setHoveredItem] = useState<MovingLineItem | null>(null)
  return (
    <section className="bg-background relative min-h-screen text-foreground">
      <div className="p-12 flex flex-col gap-12">
        <h2 className="text-2xl font-bold">Overview</h2>
        <div className="flex gap-12">
          <div className="flex w-1/2 flex-col gap-6">
            <NodesText hoveredItem={hoveredItem} />
          </div>
          <div className="grid -translate-y-10 w-1/2 grid-cols-2 gap-8"></div>
        </div>
      </div>
      <div className="absolute left-0 bottom-10">
        <MovingLine
          onHover={setHoveredItem}
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
