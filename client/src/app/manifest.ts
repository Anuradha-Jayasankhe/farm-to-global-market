export default function manifest() {
  return {
    name: 'Farm2Global - Transform Your Farm into a Global Brand',
    short_name: 'Farm2Global',
    description: 'AI-powered platform connecting farmers to global markets',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#2D5016',
    orientation: 'portrait-primary',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any maskable',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable',
      },
    ],
    categories: ['business', 'productivity', 'agriculture'],
    shortcuts: [
      {
        name: 'Marketplace',
        short_name: 'Marketplace',
        description: 'Browse agricultural products',
        url: '/marketplace',
        icons: [{ src: '/icon-192.png', sizes: '192x192' }],
      },
      {
        name: 'Dashboard',
        short_name: 'Dashboard',
        description: 'View your farm analytics',
        url: '/dashboard',
        icons: [{ src: '/icon-192.png', sizes: '192x192' }],
      },
      {
        name: 'AI Consultation',
        short_name: 'AI Consult',
        description: 'Get AI farming advice',
        url: '/ai-consultation',
        icons: [{ src: '/icon-192.png', sizes: '192x192' }],
      },
    ],
  };
}
