/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        dana: "dana",
        danaMedium: "dana-medium",
        danaBold: "dana-bold",
        danaHeavy: "dana-heavy",
        morabba: "morabba",
      },
      container: {
        center: true,
      },
      colors: {
        primary: {
          100: "#ef4444",
          200: "#dc2626",
        },
        secondary: {
          100: "#1f2937",
          200: "#111827",
        },
        dark: {
          100: "rgb(var(--color--dark))",
          200: "#111827",
        },
      },
    },
    screens: {
      xs: "480px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
  },
  plugins: [
    nextui(),
    ({ addVariant }) => {
      addVariant("childe", "&> *");
      addVariant("childe-hover", "&> *:hover");
    },
  ],
};
