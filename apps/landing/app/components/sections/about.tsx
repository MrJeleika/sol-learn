import { Button } from '../ui/button'
import { ABOUT_CARDS } from '../../constants/about/about-cards'
import { SectionCard } from '../about/section-card'

export function About() {
  return (
    <section className="bg-primary min-h-screen text-background">
      <div className="p-12 flex flex-col gap-12">
        <h2 className="text-2xl font-bold text-background">About</h2>
        <div className="flex gap-12">
          <div className="flex flex-col gap-6">
            <p className="text-[28px]">Intuitive, comprehensive, and accessible.</p>
            <Button>Start Learning</Button>
          </div>
          <div className="grid -translate-y-8 grid-cols-2 gap-8 w-full">
            {ABOUT_CARDS.map((card) => (
              <SectionCard key={card.title} title={card.title} description={card.description} icon={card.icon} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
