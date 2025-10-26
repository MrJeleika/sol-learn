import type { Metadata } from 'next'

const siteUrl = 'https://sol-learn.me/'
const siteName = 'SOL Learn'
const siteDescription =
  'An interactive educational platform that makes Solana blockchain development accessible through visual programming. Using an intuitive node-based interface, learners can drag-and-drop components to build and understand Solana transactions, programs, and cryptographic operations.'
const thumbnailPath = 'https://sol-learn.me/thumbnail.png'
const logoPath = '/logo-light.svg'
const twitterHandle = '@solana_learn'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  title: {
    default: siteName,
    template: '%s | ' + siteName,
  },
  description: siteDescription,
  keywords: [
    'Solana development tutorial',
    'How to build on Solana',
    'Solana smart contracts',
    'Anchor framework guide',
    'Rust Solana programming',
    'Solana for beginners',
    'Learn web3 development',
    'Solana transaction builder',
    'Solana educational platform',
  ],
  authors: [{ name: 'MrJeleika' }],
  creator: 'MrJeleika',
  publisher: 'MrJeleika',
  category: 'education',
  referrer: 'origin-when-cross-origin',
  formatDetection: {
    telephone: false,
    address: false,
    email: false,
  },
  icons: {
    icon: logoPath,
    shortcut: logoPath,
    apple: logoPath,
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: 'website',
    url: siteUrl,
    title: siteName,
    siteName,
    description: siteDescription,
    images: [
      {
        url: thumbnailPath,
        width: 1200,
        height: 630,
        alt: siteName,
      },
    ],
    locale: 'en_US',
    alternateLocale: ['en_GB'],
  },
  twitter: {
    card: 'summary_large_image',
    site: twitterHandle,
    creator: twitterHandle,
    title: siteName,
    description: siteDescription,
    images: [thumbnailPath],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}
