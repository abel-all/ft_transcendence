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
        'liner-filed': 'linear-gradient(to bottom, #002a43, #022e48 50%, #002a43)',
      },
      screens: {
        'FullFullSize': '1536px',
        'FullSize': '1280px',
        'LapSize': '1028px',
        'TabSize': '640px',
        'SmallSize': '427px'
      },
    },
  },
  plugins: [],
}

