/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
      extend: {
        colors: {
          bgPrimary: "#242424",
          bgSecondary: "#1a1a1a",
          textWhite: "rgba(255, 255, 255, 0.87)",
          textIndigo: "#646cff"
        },
      },
    },
    plugins: [],
    darkMode: 'false', 
  };
  