/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'brand': '0 4px 16px rgba(92, 107, 192, 0.15)',
        'brand-lg': '0 8px 24px rgba(92, 107, 192, 0.2)',
      },
      colors: {
      },
      keyframes: {
      },
      animation: {
      },
    },
  },
  darkMode: "class",
};