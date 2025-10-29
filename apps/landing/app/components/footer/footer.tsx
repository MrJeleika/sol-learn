import { FOOTER_LINKS } from '@/app/constants/footer/footer-links'
import { FooterLink } from './footer-link'
import { FooterLogo } from '../ui/icons/footer'

export function Footer() {
  return (
    <footer className="bg-background text-foreground">
      <div className="@container w-full mb-6 px-6 pt-6">
        <FooterLogo className="w-full h-full" />
        <div className="flex items-start max-lg:flex-col max-lg:gap-6 lg:justify-between max-sm:mt-4">
          <div className="flex flex-col gap-2">
            <p>Solana development is easy! Prove me wrong.</p>
            <p>© {new Date().getFullYear()} SOL Learn. All rights reserved.</p>
          </div>
          <div className="grid sm:grid-cols-2 grid-cols-1 gap-x-8 gap-y-4">
            {FOOTER_LINKS.map((link, index) => (
              <FooterLink
                key={link.href}
                href={link.href}
                label={link.label}
                Icon={link.Icon}
                iconClassName={link.iconClassName}
                className={`${link.className} ${index === 2 ? 'sm:col-start-2' : ''}`}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="footer-pattern w-full h-15"></div>
    </footer>
  )
}
