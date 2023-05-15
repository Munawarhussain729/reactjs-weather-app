/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      'white': '#FFFFFF',
      'blue': '#3b82f6',
      'purple': '#7e5bef',
      'pink': '#ff49db',
      'red': '#FF0000',
      'black': '#000000',
      'purpleBlue':'#0787f8',
      'cyan':'#06b6d4',
      'orange': '#ff7849',
      'green': '#13ce66',
      'yellow': '#ffc82c',
      'gray-dark': '#273444',
      'gray': '#374151',
      'gray-light': '#d3dce6',
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },

  },
  plugins: [],
} 