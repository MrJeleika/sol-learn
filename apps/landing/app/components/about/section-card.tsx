interface SectionCardProps {
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
}

export const SectionCard = ({ title, description, icon: Icon }: SectionCardProps) => {
  return (
    <div className="group rounded-lg lx:p-4 flex flex-col gap-4">
      <Icon className="h-14 w-14" />
      <h3 className="text-3xl font-semibold tracking-wide">{title}</h3>
      <p className="text-lg">{description}</p>
    </div>
  )
}
