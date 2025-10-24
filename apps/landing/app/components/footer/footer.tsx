import { Github, Presentation } from 'lucide-react'
import { XLogo } from '../ui/icons/X'

export function Footer() {
  return (
    <footer className="bg-background text-foreground">
      <div className="@container w-full mb-6 px-6">
        <h2 className="w-full leading-none text-center tracking-tight font-bold text-[clamp(32px,18cqw,500px)]">
          SOL LEARN
        </h2>
        <div className="flex items-start justify-between px-10">
          <div className="flex flex-col gap-2">
            <p>Solana development is easy! Prove me wrong.</p>
            <p>© {new Date().getFullYear()} SOL Learn. All rights reserved.</p>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://github.com/MrJeleika/sol-learn" target="_blank" rel="noopener noreferrer">
              <Github className="w-12 h-12" />
            </a>
            <a href="https://x.com/solana_learn" target="_blank" rel="noopener noreferrer">
              <XLogo className="w-12 h-12 [&>path]:fill-foreground" />
            </a>
            <a href="https://t.me/solana_learn" target="_blank" rel="noopener noreferrer">
              <Presentation className="w-12 h-12 " />
            </a>
          </div>
        </div>
      </div>
      <div className="footer-pattern w-full h-15"></div>
    </footer>
  )
}
