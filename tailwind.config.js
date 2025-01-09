/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./theme/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        progress: {
          "0%": { width: "0%" },
          "50%": { width: "100%" },
          "100%": { width: "0%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
      },
      animation: {
        progress: "progress 2s ease-in-out infinite",
        float: "float 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
