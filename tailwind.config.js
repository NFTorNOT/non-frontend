const plugin = require("tailwindcss/plugin");
const buttons = require("./theme/buttons.json");

const content = [
  "./pages/**/*.{js,ts,jsx,tsx}",
  "./components/**/*.{js,ts,jsx,tsx}",
];
const theme = {
  screens: {
    sm: "480px",
    md: "768px",
    lg: "976px",
    xl: "1440px",
  },
  container: {
    center: true,
    padding: "15px",
  },
  borderRadius: {
    4: "4px",
  },
  extend: {
    fontFamily: {
      satoshi: ["satoshi", "sans-serif"],
    },
  },
};

const plugins = [
  plugin(function ({ addComponents }) {
    addComponents(buttons);
  }),
];

/** @type {import('tailwindcss').Config} */
module.exports = {
  content,
  theme,
  plugins,
};
