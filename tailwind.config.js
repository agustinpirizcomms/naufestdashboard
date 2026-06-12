/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brandBlue: '#2f5aae', // Azul Institucional
        brandPrimary: '#2f5aae', // Azul Institucional
        brandSecondary: '#22404d', // Tono Secundario
        brandWhite: '#ffffff',
        brandLightBg: '#f4f5f7',
        brandDarkBg: '#121212',
        brandText: '#272626',
        brandPurple: '#9463ae', // Lavanda/Púrpura
        brandLavender: '#9463ae',
        brandCoral: '#be574b',  // Terracota
        brandTerracotta: '#be574b',
        cardBackBlend: 'rgba(34, 64, 77, 0.2)',
      },
      fontFamily: {
        montserrat: ['Montserrat', 'Arial', 'Helvetica', 'sans-serif'],
      },
      screens: {
        'mobile-boundary': '960px',
      },
    },
  },
  plugins: [],
}
