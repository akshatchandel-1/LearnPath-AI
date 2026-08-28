/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        // Obsidian Palette (Deep Dark Surfaces)
        obsidian: {
          DEFAULT: '#0B0D0F',
          base: '#0B0D0F',
          surface: '#111418',
          card: '#16191E',
          cardHover: '#1D2128',
          border: 'rgba(245, 241, 232, 0.08)',
          borderSubtle: 'rgba(245, 241, 232, 0.05)',
        },
        // Ivory Palette (Warm Readable Text)
        ivory: {
          DEFAULT: '#F5F1E8',
          light: '#FAF7F0',
          muted: '#C7C2B6',
          subtle: '#8C877D',
          dark: '#5C5850',
        },
        // Coral Palette (Vibrant Accent & CTA)
        coral: {
          DEFAULT: '#FF6B5F',
          50: '#FFF1F0',
          100: '#FFE2E0',
          200: '#FFC8C4',
          300: '#FFA49E',
          400: '#FF857A',
          500: '#FF6B5F',
          600: '#E85548',
          700: '#C93F33',
          800: '#A63329',
          900: '#872C24',
          950: '#4B130E',
        },
        // Semantic Token Mappings
        primary: {
          DEFAULT: '#FF6B5F',
          50: '#FFF1F0',
          100: '#FFE2E0',
          200: '#FFC8C4',
          300: '#FFA49E',
          400: '#FF857A',
          500: '#FF6B5F',
          600: '#E85548',
          700: '#C93F33',
          800: '#A63329',
          900: '#872C24',
          950: '#4B130E',
        },
        secondary: {
          DEFAULT: '#E8E2D6',
          50: '#FAF7F0',
          100: '#F5F1E8',
          200: '#E8E2D6',
          300: '#D4CEBF',
          400: '#BDB6A6',
          500: '#A39C8C',
          600: '#8A8373',
          700: '#6E675A',
          800: '#524C41',
          900: '#38332A',
          950: '#1F1C16',
        },
        background: {
          DEFAULT: '#0B0D0F',
          darker: '#07080A',
          lighter: '#111418',
        },
        surface: {
          card: '#111418',
          cardHover: '#171A1F',
          cardBorder: 'rgba(245, 241, 232, 0.08)',
        },
        text: {
          DEFAULT: '#F5F1E8',
          muted: '#C7C2B6',
          subtle: '#8C877D',
        },
        status: {
          success: '#34D399',
          warning: '#FBBF24',
          danger: '#F87171',
          info: '#38BDF8',
        }
      },
      boxShadow: {
        'glow-primary': '0 0 25px -5px rgba(255, 107, 95, 0.25)',
        'glow-coral': '0 0 25px -5px rgba(255, 107, 95, 0.3)',
        'glow-secondary': '0 0 25px -5px rgba(232, 226, 214, 0.15)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.5)',
      },
      borderRadius: {
        'xl': '0.875rem',
        '2xl': '1.125rem',
        '3xl': '1.5rem',
      }
    },
  },
  plugins: [],
}
