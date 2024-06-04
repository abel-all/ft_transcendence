/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'home-bg': "url('src/assets/home_background.jpg')",
      },
      screens: {
        'OurSize': '654px',
      },
    },
  },
  plugins: [],
}

