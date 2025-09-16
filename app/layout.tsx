import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'
import content from "@/content/site-content.json"

export const metadata: Metadata = {
  title: content.metadata.title,
  description: content.metadata.description,
  generator: 'v0.app',
  metadataBase: new URL('https://dalbcsweb.vercel.app'),
  openGraph: {
    title: content.metadata.title,
    description: content.metadata.description,
    url: 'https://dalbcsweb.vercel.app',
    siteName: 'Dal BCS',
    images: [
      {
        url: '/logo.png',
        width: 800,
        height: 600,
        alt: 'Dalhousie Blockchain Society Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: content.metadata.title,
    description: content.metadata.description,
    images: ['/logo.png'],
  },
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  )
}
