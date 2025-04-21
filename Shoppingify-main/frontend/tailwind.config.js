/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      "Grayish-blue": '#34333A',
      'OrangePeel'  : '#F9A109',
      'Gray'        : '#BDBDBD',
      'White'       : '#FFFFFF',
      'light-orange': '#F9A109',
      'Black'       : '#000000'
     }
  },
  plugins: [],
}

