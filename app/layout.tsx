import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://app.modulease.site'),
  title: 'Modulease | Secure EaaS Portal',
  description: 'Zero-Waste Infrastructure & Capital Financing for Managed Workspaces.',
  openGraph: {
    title: 'Modulease | Secure EaaS Portal',
    description: 'Enterprise-grade capacity planning and tax-optimized Equipment-as-a-Service solutions for managed workspace operators.',
    url: 'https://app.modulease.site',
    siteName: 'Modulease',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Modulease - Zero-Waste Infrastructure',
      },
    ],
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
