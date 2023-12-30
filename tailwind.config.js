const colors = require("tailwindcss/colors")

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2780e3",
        secondary: "#373a3c",
        success: "#3fb618",
        info: "#9954bb",
        warning: "#ff7518",
        danger: "#ff0039",
      }
    },
  },
  plugins: [],
}

