/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 4px 20px -4px rgba(16,185,129,.18)',
        card: '0 2px 10px -2px rgba(15,23,42,.10)',
        glow: '0 0 40px -8px rgba(16,185,129,.6)',
      },
      animation: {
        'float': 'floatY 3.6s ease-in-out infinite',
        'float-slow': 'floatY 5.2s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3.4s ease-in-out infinite',
        'spin-slow': 'spinSlow 40s linear infinite',
        'shimmer': 'shimmer 3.2s linear infinite',
      },
      keyframes: {
        floatY: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-12px)' } },
        pulseGlow: {
          '0%,100%': { filter: 'drop-shadow(0 0 8px rgba(52,211,153,.5))', transform: 'scale(1)' },
          '50%': { filter: 'drop-shadow(0 0 22px rgba(52,211,153,.85))', transform: 'scale(1.02)' },
        },
        spinSlow: { from: { transform: 'rotate(0)' }, to: { transform: 'rotate(360deg)' } },
        shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
      },
    },
  },
  plugins: [],
}