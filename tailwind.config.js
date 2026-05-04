/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#13201c",
        harbor: "#0f4c5c",
        clay: "#a85032",
        moss: "#4f7d52",
        paper: "#f5efe4",
        fog: "#e9eef0",
      },
      boxShadow: {
        command: "0 24px 60px rgba(15, 76, 92, 0.16)",
      },
      fontFamily: {
        display: ["Aptos Display", "Georgia", "serif"],
        sans: ["Aptos", "Segoe UI", "sans-serif"],
      },
    },
  },
  plugins: [],
};
