/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        'main-poster':"url('https://static.vecteezy.com/system/resources/previews/026/827/704/non_2x/banking-technology-design-vector.jpg')"
      },
      fontFamily:{
        "All-Font": ["Ubuntu", "serif"]
      }

    },
  },
  plugins: [],
}