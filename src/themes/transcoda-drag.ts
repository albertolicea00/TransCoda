export default {
  id: 'transcoda-drag',
  name: 'Drag Mode',
  description:
    'Glitzy neon pinks and purples, custom animated buttons, and absolute visual stardom.',
  author: 'TransCoda',
  mode: 'dark',
  swatches: ['#FF1493', '#8A2BE2', '#FFD700'],
  variables: {
    '--font-sans': '"Outfit", system-ui, -apple-system, sans-serif',
    '--bg-deep': '#120216',
    '--bg-dark': '#200325',
    '--bg-card': 'rgba(32, 3, 37, 0.65)',
    '--bg-panel': 'rgba(21, 2, 25, 0.85)',
    '--bg-input': 'rgba(255, 20, 147, 0.1)',
    '--bg-hover': 'rgba(255, 20, 147, 0.15)',
    '--primary': '#FF1493',
    '--primary-glow': 'rgba(255, 20, 147, 0.45)',
    '--accent': '#FFD700',
    '--accent-glow': 'rgba(255, 215, 0, 0.4)',
    '--gradient-primary': 'linear-gradient(135deg, #FF1493 0%, #8A2BE2 100%)',
    '--gradient-hover': 'linear-gradient(135deg, #8A2BE2 0%, #FF1493 100%)',
    '--gradient-dark': 'linear-gradient(180deg, #200325 0%, #120216 100%)',
    '--text-primary': '#FFFFFF',
    '--text-secondary': '#FCD7FD',
    '--text-muted': '#A474AB',
    '--text-success': '#00FFCC',
    '--text-error': '#FF0055',
    '--border-color': 'rgba(255, 20, 147, 0.2)',
    '--border-focus': '#FF1493',
    '--shadow-lg': '0 15px 35px rgba(0, 0, 0, 0.7)',
    '--shadow-glow': '0 0 30px rgba(255, 20, 147, 0.35)',
    '--radius-sm': '8px',
    '--radius-md': '16px',
    '--radius-lg': '24px',
  },
  css: `
    @keyframes glitter {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    .btn-glowup {
      background: linear-gradient(270deg, #FF1493, #8A2BE2, #FFD700, #FF1493) !important;
      background-size: 600% 600% !important;
      animation: glitter 8s ease infinite !important;
      box-shadow: 0 0 20px rgba(255, 20, 147, 0.5) !important;
      border: none !important;
    }
    .glass-card {
      border: 1px solid rgba(255, 20, 147, 0.25) !important;
      box-shadow: 0 0 15px rgba(255, 20, 147, 0.1), var(--shadow-lg) !important;
    }
  `,
};
