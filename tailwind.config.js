/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          teal: "#14d2a0",
          blue: "#5b8fff",
          dark: "#050508",
          card: "rgba(15,15,20,0.85)",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  corePlugins: {
    preflight: true,
  },
}
