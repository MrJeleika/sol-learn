import { ABOUT_CARDS } from '../../constants/about/about-cards'
import { SectionCard } from '../about/section-card'
import { FlipButton } from '../ui/flip-button'

export function About() {
  return (
    <section className="bg-primary min-h-screen text-background">
      <div className="p-12 flex flex-col gap-12">
        <h2 className="text-2xl font-bold text-background">About</h2>
        <div className="flex gap-12">
          <div className="flex w-1/3 flex-col gap-6">
            <p className="text-[28px]">Intuitive, comprehensive, and accessible.</p>
            <FlipButton frontText="Start Learning" backText="Start Learning" />
          </div>
          <div className="grid -translate-y-10 w-2/3 grid-cols-2 gap-8">
            {ABOUT_CARDS.map((card) => (
              <SectionCard key={card.title} title={card.title} description={card.description} icon={card.icon} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
