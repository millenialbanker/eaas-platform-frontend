import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Modulease | Secure EaaS Portal',
  description: 'Zero-Waste Infrastructure & Capital Financing for Managed Workspaces.',
  openGraph: {
    title: 'Modulease | Secure EaaS Portal',
    description: 'Enterprise-grade capacity planning and tax-optimized Equipment-as-a-Service solutions for managed workspace operators.',
    url: 'https://app.modulease.site',
    siteName: 'Modulease',
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
