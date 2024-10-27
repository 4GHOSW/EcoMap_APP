/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './src/screens/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      backgroundColor: {
        primary: '#1E96FC',
        secondary: '#072AC8',
      },
      borderColor: {
        primary: '#1E96FC',
      },
      textColor: {
        primary: '#1E96FC',
      },
    },
  },
  plugins: [],
};
