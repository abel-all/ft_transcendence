/** @type {import('tailwindcss').Config} */

module.exports = {
  mode: 'jit',
  purge: {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    options: {
      safelist: [
        'bg-[#7DAA48]',
        'bg-[#8374D1]',
        'bg-[#E04154]',
        'bg-[#D9D9D9]',
      ],
    },
  },
  theme: {
    extend: {
      backgroundImage: {
        'home-bg': "url('src/assets/imgs/home_background.jpg')",
        'liner-filed': 'linear-gradient(to bottom, #002a43, #022e48 50%, #002a43)',
      },
      colors: {
        backColor: '#161C20',
      },
      screens: {
        'FullFullSize': '1536px',
        'FullSize': '1280px',
        'LapSize': '1028px',
        'LapSizeS': '768px',
        'TabSize': '640px',
        'SmallSize': '427px',
        'LastSize': '320px'
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
