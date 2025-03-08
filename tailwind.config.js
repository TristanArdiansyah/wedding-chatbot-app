/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',   // Next.js 13 "app" directory
    './components/**/*.{js,ts,jsx,tsx}', // If you keep components outside "app"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
