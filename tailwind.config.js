/** @type {import('tailwindcss').Config} */
const v = (name) => `rgb(var(${name}) / <alpha-value>)`

export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: v('--ink'),
        navy: v('--navy'),
        surface: v('--surface'),
        edge: v('--edge'),
        azure: v('--azure'),
        sky: v('--sky'),
        fore: v('--fore'),
        mist: v('--mist'),
        paper: v('--paper'),
        paperInk: v('--paper-ink'),
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      keyframes: {
        marquee: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
        pulseRing: { '0%': { transform: 'scale(0.85)', opacity: '0.6' }, '100%': { transform: 'scale(1.7)', opacity: '0' } },
        dash: { to: { strokeDashoffset: '-24' } },
        spinRing: { to: { transform: 'rotateY(360deg)' } },
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
        float: 'float 6s ease-in-out infinite',
        'pulse-ring': 'pulseRing 2.4s ease-out infinite',
        dash: 'dash 1.2s linear infinite',
        'spin-ring': 'spinRing 26s linear infinite',
      },
    },
  },
  plugins: [],
}
