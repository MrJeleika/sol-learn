import type { LucideIcon } from 'lucide-react'

interface SolutionCardProps {
  title: string
  description: string
  icon: LucideIcon
  index: number
}

export function SolutionCard({ title, description, icon: Icon, index }: SolutionCardProps) {
  return (
    <div className="w-full rounded-[24px] border border-border bg-background shadow-[0_10px_40px_rgba(0,0,0,0.25)] p-8">
      <div className="flex items-start justify-between">
        <span className="text-sm opacity-60">{String(index + 1).padStart(2, '0')}</span>
      </div>
      <div className="mt-4">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <Icon className="h-10 w-10 text-primary" />
            <h3 className="text-xl font-semibold text-foreground">{title}</h3>
          </div>
          <p className="sm:text-lg text-base text-muted-foreground leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  )
}
