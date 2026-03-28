const { heroui } = require("@heroui/theme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Space Grotesk'", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 24px 80px rgba(11, 20, 55, 0.22)",
      },
      backgroundImage: {
        "mesh-grid":
          "radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.22) 0, transparent 32%), radial-gradient(circle at 80% 0%, rgba(255, 212, 163, 0.18) 0, transparent 24%), linear-gradient(135deg, rgba(12, 28, 61, 0.97), rgba(7, 16, 36, 0.95))",
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
};
