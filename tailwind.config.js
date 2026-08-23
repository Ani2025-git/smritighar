/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        museum: {
          950: '#17110C',
          900: '#201812',
          800: '#2A1F18',
          700: '#3A2C22',
        },
        wood: {
          dark: '#3A2618',
          deep: '#291A10',
          light: '#543926',
        },
        amber: {
          gold: '#C99A5A',
          goldLight: '#E5BF85',
          goldDark: '#9E7438',
        },
        parchment: {
          DEFAULT: '#E8D3AD',
          dark: '#D2B98E',
          light: '#F2E5C9',
        },
        cream: {
          DEFAULT: '#F4E8D0',
          soft: '#FAF3E3',
        },
        ink: {
          dark: '#241A12',
          medium: '#423326',
          muted: '#6E5948',
        }
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'museum': '0 10px 30px -5px rgba(0, 0, 0, 0.8), 0 0 15px rgba(201, 154, 90, 0.15)',
        'gold-glow': '0 0 20px rgba(201, 154, 90, 0.3)',
        'cabinet': 'inset 0 2px 10px rgba(0, 0, 0, 0.9), 0 8px 24px rgba(0, 0, 0, 0.6)',
      },
      backgroundImage: {
        'vignette': 'radial-gradient(circle at center, transparent 40%, rgba(23, 17, 12, 0.95) 100%)',
        'spotlight': 'radial-gradient(circle at 50% 20%, rgba(201, 154, 90, 0.15) 0%, transparent 60%)',
      }
    },
  },
  plugins: [],
}
