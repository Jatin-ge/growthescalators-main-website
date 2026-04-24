import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        orange: { DEFAULT: '#FF6500', dark: '#CC4400', deep: '#FF3D00' },
        bg: { DEFAULT: '#06060A', card: '#111118' },
        warm: '#F0EDE8',
        muted: '#6B6B7A',
        border: 'rgba(255,101,0,0.15)',
      },
      fontFamily: {
        syne: ['var(--font-syne)', 'sans-serif'],
        outfit: ['var(--font-outfit)', 'sans-serif'],
        bebas: ['var(--font-bebas)', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}

export default config
