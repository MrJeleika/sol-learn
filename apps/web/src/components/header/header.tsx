import { useReactFlow, type XYPosition } from '@xyflow/react'
import { useCallback } from 'react'
import { generateNodeId } from '@/utils/crypto/crypto.utils'
import { DraggableNode } from '@/components/node-select/draggable-node'
import { menuConfig } from '@/constants/menu-config'
import type { NodeType } from '@/types/node'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '../ui/navigation-menu'

export const Header = () => {
  const { screenToFlowPosition, setNodes } = useReactFlow()

  const handleNodeDrop = useCallback(
    (nodeType: NodeType, screenPosition: XYPosition) => {
      const flow = document.querySelector('.react-flow')
      const flowRect = flow?.getBoundingClientRect()
      const isInFlow =
        flowRect &&
        screenPosition.x >= flowRect.left &&
        screenPosition.x <= flowRect.right &&
        screenPosition.y >= flowRect.top &&
        screenPosition.y <= flowRect.bottom

      if (isInFlow) {
        const position = screenToFlowPosition(screenPosition)
        const newNode = {
          id: generateNodeId(),
          type: nodeType,
          position,
          data: {},
        }
        setNodes((nds) => nds.concat(newNode))
      }
    },
    [setNodes, screenToFlowPosition]
  )

  return (
    <header className="flex border-b-2 rounded-b-[20px] relative z-9999 border-border w-full items-center bg-[#141414] px-8 py-4 justify-between text-foreground">
      <div className="flex items-center gap-2">
        <img src="/logo-light.svg" alt="logo" className="w-10 h-10" />
        <h1>SOL LEARN</h1>
      </div>
      <NavigationMenu viewport={false}>
        <NavigationMenuList className="gap-4">
          {menuConfig.map((category) => (
            <NavigationMenuItem key={category.id}>
              <div className="relative border-border border rounded-t-[6px]">
                <NavigationMenuTrigger className=" relative z-30 ">
                  <p className="text-sm font-medium text-foreground">{category.label}</p>
                </NavigationMenuTrigger>
                <div
                  className="absolute -bottom-1 z-20 left-0 right-0 h-3 rounded-b-[6px]"
                  style={{ backgroundColor: category.color }}
                />
              </div>
              <NavigationMenuContent className="overflow-visible! p-0 border-none ">
                <div className="grid grid-cols-1 gap-2 p-4 w-[200px] bg-background rounded-[8px] border border-border">
                  {category.nodes.map((nodeType) => (
                    <div key={nodeType} className="relative z-50">
                      <DraggableNode type={nodeType} onDrop={handleNodeDrop} />
                    </div>
                  ))}
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
      <div></div>
    </header>
  )
}
