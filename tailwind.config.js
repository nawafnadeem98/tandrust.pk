/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./lib/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        burgundy: { DEFAULT: "#A64A62", deep: "#8A3650", rose: "#F5DDE3", cream: "#FDF5F7", text: "#43232D" },
        brand: {
          teal: "#087F68",
          "teal-dark": "#056653",
          navy: "#12304A",
          blue: "#2878B5",
          mint: "#EAF7F3",
          "pale-blue": "#EFF6FB",
          bg: "#F7FAFC",
          card: "#FFFFFF",
          text: "#183042",
          muted: "#5B6B78",
          border: "#DCE6EB",
          success: "#197548",
          warning: "#946200",
          error: "#B42318",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "'Segoe UI'",
          "Roboto",
          "sans-serif",
        ],
        urdu: [
          "'Noto Nastaliq Urdu'",
          "'Jameel Noori Nastaleeq'",
          "'Urdu Typesetting'",
          "Arial",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};
