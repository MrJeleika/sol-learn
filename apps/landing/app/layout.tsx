import type { Metadata } from 'next'
import { Kode_Mono } from 'next/font/google'
import './globals.css'

const kodeMono = Kode_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
})

export const metadata: Metadata = {
  title: 'Sol Learn',
  description:
    'An interactive educational platform that makes Solana blockchain development accessible through visual programming. Using an intuitive node-based interface, learners can drag-and-drop components to build and understand Solana transactions, programs, and cryptographic operations.',
  icons: {
    icon: '/logo-light.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${kodeMono.className} antialiased`}>{children}</body>
    </html>
  )
}
