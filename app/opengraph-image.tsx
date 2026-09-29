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
          background: '#FFFFFF',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          border: '12px solid #0F172A',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
          <div style={{ width: '56px', height: '18px', background: '#3B82F6', borderRadius: '4px' }} />
          <div style={{ width: '110px', height: '18px', background: '#059669', borderRadius: '4px' }} />
        </div>
        <div style={{ color: '#0F172A', fontSize: '64px', fontWeight: '800', letterSpacing: '-0.025em' }}>
          Modulease
        </div>
        <div style={{ color: '#475569', fontSize: '26px', marginTop: '12px', fontWeight: '600' }}>
          Zero-Waste Infrastructure & EaaS Portal
        </div>
      </div>
    ),
    { ...size }
  )
}
