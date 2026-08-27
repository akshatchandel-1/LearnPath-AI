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
        primary: {
          DEFAULT: '#E05A47',
          50: '#FDF6F4',
          100: '#FCEBE7',
          200: '#F9D5CD',
          300: '#F3B2A4',
          400: '#EB8875',
          500: '#E05A47',
          600: '#C94A38',
          700: '#A83B2B',
          800: '#8B3326',
          900: '#742E24',
          950: '#3E150F',
        },
        secondary: {
          DEFAULT: '#D99A8A',
          50: '#FAF0ED',
          100: '#F5E2DC',
          200: '#EBC5B9',
          300: '#E0A897',
          400: '#D99A8A',
          500: '#C87F6E',
          600: '#B06554',
          700: '#944F3F',
          800: '#7A4033',
          900: '#64362C',
          950: '#381B15',
        },
        background: {
          DEFAULT: '#F6F2EA',
          darker: '#111214',
          lighter: '#FFFDF8',
        },
        surface: {
          card: '#FFFDF8',
          cardHover: '#FFFFFF',
          cardBorder: '#E6E0D7',
        },
        text: {
          DEFAULT: '#202124',
          muted: '#5F6368',
          subtle: '#8A8F98',
        },
        status: {
          success: '#3F8F68',
          warning: '#C48A3A',
          danger: '#C94A4A',
          info: '#4A7BC7',
        }
      },
      boxShadow: {
        'card-warm': '0 8px 28px rgba(32, 33, 36, 0.06)',
        'card-hover': '0 12px 32px rgba(32, 33, 36, 0.09)',
        'glow-primary': '0 4px 20px -2px rgba(224, 90, 71, 0.15)',
        'glow-secondary': '0 4px 20px -2px rgba(217, 154, 138, 0.15)',
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
