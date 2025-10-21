interface SectionCardProps {
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
}

export const SectionCard = ({ title, description, icon: Icon }: SectionCardProps) => {
  return (
    <div className="group rounded-lg p-4 flex flex-col gap-3">
      <Icon className="h-16 w-16" />
      <h3 className="text-2xl font-semibold">{title}</h3>
      <p className=" text-lg leading-relaxed">{description}</p>
    </div>
  )
}
