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
        'home-bg': "url('src/assets/home_background.jpg')",
        'liner-filed': 'linear-gradient(to bottom, #002a43, #022e48 50%, #002a43)',
        'backColor' : "#161C20",
      },
      colors: {
        backColor: '#161C20',
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
  variants: {
    extend: {},
  },
  plugins: [],
}


{/* 

209 + 324 + 582  = 1115

18.74% + 29.05% + 52.19%




272 of 1728 = 15.74%
*/}





// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {
//       backgroundImage: {
//         'home-bg': "url('src/assets/home_background.jpg')",
//         'liner-filed': 'linear-gradient(to bottom, #002a43, #022e48 50%, #002a43)',
//       },
//       screens: {
//         'FullFullSize': '1536px',
//         'FullSize': '1280px',
//         'LapSize': '1028px',
//         'TabSize': '640px',
//         'SmallSize': '427px'
//       },
//     },
//   },
//   plugins: [],
// }