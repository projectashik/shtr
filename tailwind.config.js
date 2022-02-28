const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");
module.exports = {
  content: ["pages/**/*.tsx", "components/**/*.tsx", "lib/**/*.tsx"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        gray101: "#F3F4F6",
        dark101: "#19191C",
        dark102: "#27282C",
        primary: colors.blue,
      },
      fontFamily: {
        sans: ["DM Sans", ...defaultTheme.fontFamily.sans],
        head: ["Mulish", ...defaultTheme.fontFamily.sans],
      },
      animation: {
        enter: "enter 0.5s ease-in-out",
        leave: "leave 0.5s ease-in-out",
      },
      keyframes: {
        enter: {
          "0%": { transform: "translateY(-100px)" },
          "100%": { transform: "translateY(0px)" },
        },
        leave: {
          "0%": { transform: "translateY(0px)" },
          "100%": { transform: "translateY(-100px)" },
        },
      },
    },
  },
  plugins: [],
};
