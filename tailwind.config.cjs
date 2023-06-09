/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#ffbd00",
        focus: "#0095ff80",
        fondo: {
          light: "#ffffff",
          dark: "#212529",
        },
        focusColor: "#ffbd00",
        input: {
          light: "#F8F9FA",
          dark: "#212529",
        },
        error: "#dc3545",
        delete: "#d90429",
      },
      borderRadius: {
        default: "0.4rem",
      },
    },
    screens: {
      xs: { max: "599px" },
      sm: { min: "600px" },
      md: { min: "768px" },
      lg: { min: "992px" },
      xl: { min: "1200px" },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
