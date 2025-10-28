import { ABOUT_CARDS } from '../../constants/about/about-cards'
import { SectionCard } from '../about/section-card'
import { FlipButton } from '../ui/flip-button'

export function About() {
  return (
    <section className="bg-primary min-h-screen sm:pt-12 pt-6 text-background">
      <div className="sm:p-12 p-6 flex flex-col sm:gap-12 gap-6">
        <h2 className="text-2xl font-bold text-background">About</h2>
        <div className="flex lg:flex-row flex-col gap-12">
          <div className="flex w-full lg:w-1/4 flex-col gap-6">
            <p className="text-[28px]">Intuitive, comprehensive, and accessible.</p>
            <a href="https://app.sol-learn.me/" target="_blank" rel="noopener noreferrer">
              <FlipButton frontText="Start Learning" backText="Start Learning" />
            </a>
          </div>
          <div className="grid lg:-translate-y-10 lg:w-3/4 w-full grid-cols-1 lg:grid-cols-2 gap-8">
            {ABOUT_CARDS.map((card, index) => (
              <SectionCard
                key={card.title}
                title={card.title}
                description={card.description}
                icon={card.icon}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
