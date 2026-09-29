import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Modulease - Scale Your Workspace. Protect your Capital.'
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
        {/* Desk Logo Graphic */}
        <svg width="100" height="80" viewBox="0 0 50 40" fill="none" style={{ marginBottom: '24px' }}>
          <rect x="15" y="2" width="20" height="8" rx="2" fill="#3B82F6" />
          <rect x="2" y="13" width="46" height="8" rx="3" fill="#059669" />
          <rect x="6" y="24" width="8" height="14" rx="2" fill="#0F172A" />
          <rect x="36" y="24" width="8" height="14" rx="2" fill="#0F172A" />
        </svg>

        <div style={{ color: '#0F172A', fontSize: '60px', fontWeight: '800', letterSpacing: '-0.025em', marginBottom: '8px' }}>
          Modulease
        </div>

        {/* Tagline with exact color mapping */}
        <div style={{ display: 'flex', fontSize: '24px', fontWeight: '700', marginTop: '8px' }}>
          <span style={{ color: '#0F172A' }}>Scale Your Workspace</span>
          <span style={{ color: '#3B82F6' }}>.</span>
          <span style={{ color: '#059669', marginLeft: '10px' }}>Protect your Capital</span>
          <span style={{ color: '#3B82F6' }}>.</span>
        </div>
      </div>
    ),
    { ...size }
  )
}
