/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors:{
        primary: "#F5F5F5",
        secondary: "#F05454",
        tertiary:"#30475E",
        semi_dark: "#121212",
        light: "ffffff",
        dark: "#000000"
      }
    },
  },
  plugins: [],
}

