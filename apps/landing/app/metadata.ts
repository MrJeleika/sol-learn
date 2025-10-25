import type { Metadata } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
const siteName = 'Sol Learn'
const siteDescription =
  'An interactive educational platform that makes Solana blockchain development accessible through visual programming. Using an intuitive node-based interface, learners can drag-and-drop components to build and understand Solana transactions, programs, and cryptographic operations.'
const thumbnailPath = '/thumbnail.png'
const logoPath = '/logo-light.svg'
const twitterHandle = '@sollearn'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  title: {
    default: siteName,
    template: '%s | ' + siteName,
  },
  description: siteDescription,
  keywords: [
    'Solana',
    'Blockchain',
    'Education',
    'Visual Programming',
    'Crypto',
    'Web3',
    'Anchor',
    'Rust',
  ],
  authors: [{ name: 'Sol Learn' }],
  creator: 'Sol Learn',
  publisher: 'Sol Learn',
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
    apple: thumbnailPath,
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
  themeColor: '#141414',
}


