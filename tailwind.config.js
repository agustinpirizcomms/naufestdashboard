/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brandBlue: '#2f5aae', // --nv-primary-accent
        brandTeal: '#86dbe0', // --header-bg-custom
        brandWhite: '#ffffff',
        brandLightBg: '#f4f5f7',
        brandDarkBg: '#121212',
        brandText: '#272626',
        brandPurple: '#9463ae', // --nv-c-1
        brandCoral: '#be574b',  // --nv-c-2
        cardBackBlend: 'rgba(34, 64, 77, 0.2)', // #22404d33
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
