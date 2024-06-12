// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Add other file types if necessary
  ],
  theme: {
    extend: {},
    container: {
      padding : {
        md: "10rem",
      },
    }
  },
  plugins: [],
}
