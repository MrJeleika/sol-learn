import type { Metadata } from 'next'
import { Kode_Mono } from 'next/font/google'
import './globals.css'
import { metadata as metadataConfig } from './metadata'

const kodeMono = Kode_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
})

export const metadata: Metadata = metadataConfig

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
