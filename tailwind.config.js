/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Palette 3 Smash - dal logo
        smash: {
          blu: '#3451a1',
          'blu-dark': '#2a4085',
          'blu-light': '#4563b5',
          cream: '#f5e6c8',
          'cream-dark': '#e8d4ac',
          'cream-light': '#faf3e3',
        },
        // Colori neutri
        dark: '#1a1a1a',
        light: '#fafafa',
      },
      fontFamily: {
        display: ['Oswald', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
