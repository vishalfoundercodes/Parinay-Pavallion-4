/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0f3d2e", // Dark Green (Header / Footer)
        secondary: "#d4af37", // Gold
        accent: "#0a2b20", // Darker Green
        lightGray: "#e5e7eb",
        darkGray: "#6b7280",
        red: "#FF0032",
      },
    },
  },
  plugins: [],
};