/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gold: {
          400: '#D4AF37',
          500: '#AA8222',
          600: '#8A6A1C',
          700: '#685015',
          800: '#4A390F'
        },
        navy: {
          800: '#111827',
          900: '#0B0F19'
        }
      },
      fontFamily: {
        sans: ['Inter', 'Kanit', 'sans-serif'],
        serif: ['Outfit', 'Kanit', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
