/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    fontFamily: {
      'sans': ['Roboto', 'sans-serif'],
      'marker': ['"Permanent Marker"', 'cursive'], // Adiciona a nova fonte
    },
    extend: {
      backgroundImage: {
        "home": "url('/assets/img/bg.png')"
      }
    },
  },
  plugins: [],
}
