import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'surface': 'rgb(var(--color-surface) / <alpha-value>)',
        'surface-container': 'rgb(var(--color-surface-container) / <alpha-value>)',
        'surface-container-low': 'rgb(var(--color-surface-container-low) / <alpha-value>)',
        'surface-container-highest': 'rgb(var(--color-surface-container-highest) / <alpha-value>)',
        'surface-container-lowest': 'rgb(var(--color-surface-container-lowest) / <alpha-value>)',
        'surface-variant': 'rgb(var(--color-surface-variant) / <alpha-value>)',
        
        'on-surface': 'rgb(var(--color-on-surface) / <alpha-value>)',
        'on-surface-variant': 'rgb(var(--color-on-surface-variant) / <alpha-value>)',
        
        'primary': 'rgb(var(--color-primary-500) / <alpha-value>)',
        'primary-variant': 'rgb(var(--color-primary-400) / <alpha-value>)',
        'on-primary': 'rgb(var(--color-on-primary) / <alpha-value>)',
        
        'secondary': 'rgb(var(--color-secondary-500) / <alpha-value>)',
        'tertiary': 'rgb(var(--color-tertiary-500) / <alpha-value>)',
        
        'success': 'rgb(var(--color-success-500) / <alpha-value>)',
        'warning': 'rgb(var(--color-warning-500) / <alpha-value>)',
        'danger': 'rgb(var(--color-danger-500) / <alpha-value>)',
        
        'outline': 'rgb(var(--color-outline) / <alpha-value>)',
        'outline-variant': 'rgb(var(--color-outline-variant) / <alpha-value>)',
      },
      fontFamily: {
        heading: ['Manrope', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
        label: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'glow-primary': '0 4px 30px rgba(192, 193, 255, 0.1)',
        'glow-success': '0 4px 30px rgba(78, 222, 163, 0.15)',
        'ambient': '0 20px 40px rgba(13, 28, 45, 0.06)',
        'ambient-dark': '0 20px 40px rgba(0, 0, 0, 0.5)',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '112': '28rem',
      },
      keyframes: {
        shrink: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' }
        }
      }
    },
  },
  plugins: [],
} satisfies Config
