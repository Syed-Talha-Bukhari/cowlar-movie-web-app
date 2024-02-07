/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
      extend: {
        colors: {
          background: "#242424",
          navbar: "#1a1a1a",
          textColor: "rgba(255, 255, 255, 0.87)"
        },
      },
    },
    plugins: [],
    darkMode: 'false', 
  };
  