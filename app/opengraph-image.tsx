import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Modulease - Zero-Waste Infrastructure'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0F172A',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
          <div style={{ width: '48px', height: '16px', background: '#3B82F6', borderRadius: '4px' }} />
          <div style={{ width: '96px', height: '16px', background: '#059669', borderRadius: '4px' }} />
        </div>
        <div style={{ color: 'white', fontSize: '64px', fontWeight: '800', letterSpacing: '-0.025em' }}>
          Modulease
        </div>
        <div style={{ color: '#94A3B8', fontSize: '26px', marginTop: '12px', fontWeight: '500' }}>
          Zero-Waste Infrastructure & EaaS Portal
        </div>
      </div>
    ),
    { ...size }
  )
}
