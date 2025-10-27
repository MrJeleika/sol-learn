import { DraggableNode } from '@/components/node-select/draggable-node'
import { menuConfig } from '@/constants/menu-config'
import type { NodeType } from '@/types/node'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Menu } from 'lucide-react'
import { useState } from 'react'

interface MobileMenuProps {
  onDrop: (nodeType: NodeType, screen: { x: number; y: number }) => void
}

export function MobileMenu({ onDrop }: MobileMenuProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [openAccordion, setOpenAccordion] = useState<string | undefined>(menuConfig[0]?.id)

  const handleDragStart = (categoryId: string) => {
    setIsDragging(true)
    setOpenAccordion(categoryId)
  }

  const handleDragEnd = () => {
    setIsDragging(false)
  }

  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger className="inline-flex items-center justify-center rounded-md p-2 border border-border">
          <Menu className="w-5 h-5" />
        </SheetTrigger>
        <SheetContent side="right" className="z-10000 w-[60%] sm:max-w-[320px] p-0 overflow-visible">
          <div className="p-4 pt-12">
            <Accordion
              type="single"
              collapsible
              value={isDragging ? openAccordion : openAccordion}
              onValueChange={(value) => {
                if (!isDragging) {
                  setOpenAccordion(value)
                }
              }}
            >
              {menuConfig.map((category) => (
                <AccordionItem key={category.id} value={category.id} className="border-b border-border">
                  <AccordionTrigger className="py-3">
                    <div className="flex items-center gap-2">
                      <span
                        className="inline-block w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: category.color }}
                      />
                      <span>{category.label}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-1">
                    <div className="grid grid-cols-1 gap-2 p-2">
                      {category.nodes.map((nodeType) => (
                        <div key={nodeType}>
                          <DraggableNode
                            type={nodeType}
                            onDrop={onDrop}
                            onDragStart={() => handleDragStart(category.id)}
                            onDragEnd={handleDragEnd}
                          />
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
