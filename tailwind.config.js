/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-green": "#54E18C",
        "primary-yellow": "#FDE585",
        "primary-red": "#E98E8D",
        "background": "#F6F3EB",
        "alert-green": "#07B401",
        "alert-yellow": "#FAB500",
        "alert-red": "#F90400",
      }
    },
  },
  plugins: [],
}