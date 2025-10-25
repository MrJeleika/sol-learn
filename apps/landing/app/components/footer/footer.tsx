import { FOOTER_LINKS } from '@/app/constants/footer/footer-links'
import { FooterLink } from './footer-link'

export function Footer() {
  return (
    <footer className="bg-background text-foreground">
      <div className="@container w-full mb-6 px-6">
        <h2 className="w-full leading-none mb-4 text-center tracking-tight font-bold text-[clamp(32px,18cqw,500px)]">
          SOL LEARN
        </h2>
        <div className="flex items-start justify-between px-10">
          <div className="flex flex-col gap-2">
            <p>Solana development is easy! Prove me wrong.</p>
            <p>© {new Date().getFullYear()} SOL Learn. All rights reserved.</p>
          </div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-4">
            {FOOTER_LINKS.map((link) => (
              <FooterLink
                key={link.href}
                href={link.href}
                label={link.label}
                Icon={link.Icon}
                iconClassName={link.iconClassName}
                className={link.className}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="footer-pattern w-full h-15"></div>
    </footer>
  )
}
