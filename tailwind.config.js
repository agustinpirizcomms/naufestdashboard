/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brandBlue: '#2f5aae',
        brandBlueLight: '#4a75cf',
        brandText: '#272626',
        brandBgLight: '#f4f5f7',
        brandDark: '#121212',
        brandPurple: '#9463ae',
        brandTerracotta: '#be574b',
        brandCyan: '#86dbe0',
      },
      fontFamily: {
        montserrat: ['Montserrat', 'Arial', 'Helvetica', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
