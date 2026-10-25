import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        surface: 'var(--surface)',
        accent: 'var(--accent)',
        'accent-2': 'var(--accent-2)',
        ink: 'var(--text)',
        muted: 'var(--muted)',
        line: 'var(--line)',
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'Anton', 'Impact', 'sans-serif'],
        label: ['Lato', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mm: ['Montserrat', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config
