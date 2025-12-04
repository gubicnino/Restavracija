/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#ba853a',
          light: '#c1a47c',
          dark: '#ba853a',
        },
        black: {
          rich: '#0a0a0a',
          card: '#1a1a1a',
          elevated: '#252525',
        }
      },
      fontFamily: {
        playfair: ['Playfair Display', 'serif'],
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
