import type { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard — RailPulse',
  description: 'Market analysis dashboard with real-time insights and recommendations',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
    </>
  )
}
