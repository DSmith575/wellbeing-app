/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities(
        {
          ".flip-x": {
            transform: "scaleX(-1)",
          },
        },
        ["responsive", "hover"], // Optionally add responsive or hover states
      );
    },
  ],
};
