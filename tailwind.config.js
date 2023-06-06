/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/*.{html,js}", "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      maxHeight: {
        '60vh': '60vh',
      },
    },
    listStyleType: {
      square: 'square',
    },
  },
  plugins: [
    require("flowbite/plugin"),
  ],
}
