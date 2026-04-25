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
        // Portfolio-aligned palette
        orange: { DEFAULT: '#FF6B35', hover: '#E55A2A', dark: '#E55A2A', deep: '#E55A2A' },
        violet: { DEFAULT: '#6C63FF' },
        teal:   { DEFAULT: '#00D4AA' },
        warm:   '#0f0f1a',
        muted:  '#9898b8',
        border: 'rgba(255,107,53,0.20)',
        bg:     { DEFAULT: '#ffffff', card: 'rgba(255,255,255,0.60)' },
      },
      fontFamily: {
        // Single font family — every alias points at Plus Jakarta Sans so
        // existing .font-syne/.font-outfit/.font-bebas usages keep working
        // until those pages get rebuilt in later PRs.
        jakarta: ['var(--font-jakarta)', 'sans-serif'],
        syne:    ['var(--font-jakarta)', 'sans-serif'],
        outfit:  ['var(--font-jakarta)', 'sans-serif'],
        bebas:   ['var(--font-jakarta)', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}

export default config
