import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Farm2Global - Transform Your Farm into a Global Brand';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 60,
          background: 'linear-gradient(135deg, #2D5016 0%, #4A7C59 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          padding: '40px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: 30,
          }}
        >
          <div
            style={{
              width: 100,
              height: 100,
              background: 'white',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 30,
              fontSize: 60,
            }}
          >
            🌾
          </div>
          <div style={{ fontSize: 80, fontWeight: 'bold' }}>Farm2Global</div>
        </div>
        <div
          style={{
            fontSize: 36,
            textAlign: 'center',
            maxWidth: '90%',
            opacity: 0.9,
          }}
        >
          Transform Your Farm into a Global Brand
        </div>
        <div
          style={{
            fontSize: 24,
            marginTop: 30,
            opacity: 0.8,
          }}
        >
          AI-Powered Agriculture • Global Marketplace • 3-5x Income Growth
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
