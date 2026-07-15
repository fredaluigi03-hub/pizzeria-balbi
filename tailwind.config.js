/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#c9a227',
          light: '#e8c547',
          dark: '#b8960c',
        },
        cream: '#f0ece4',
        charcoal: {
          DEFAULT: '#0f0e0d',
          mid: '#1a1916',
          light: '#252320',
        },
        fire: '#c0392b',
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
        geist: ['Geist', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
