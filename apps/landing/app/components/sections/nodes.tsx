import { ABOUT_CARDS } from '../../constants/about/about-cards'
import { SectionCard } from '../about/section-card'
import { FlipButton } from '../ui/flip-button'

export function Nodes() {
  return (
    <section className="bg-background min-h-screen text-foreground">
      <div className="p-12 flex flex-col gap-12">
        <h2 className="text-2xl font-bold">Overview</h2>
        <div className="flex gap-12">
          <div className="flex w-1/2 flex-col gap-6">
            <p className="text-[28px]">Intuitive, comprehensive, and accessible.</p>
            <FlipButton frontText="Start Learning" backText="Start Learning" />
          </div>
          <div className="grid -translate-y-10 w-1/2 grid-cols-2 gap-8">
            {ABOUT_CARDS.map((card) => (
              <SectionCard key={card.title} title={card.title} description={card.description} icon={card.icon} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
