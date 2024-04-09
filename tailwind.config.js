/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        dana: "dana",
        danaMedium: "dana-medium",
        danaBold: "dana-bold",
        danaHeavy: "dana-heavy",
      },
    },
  },
  plugins: [],
};
