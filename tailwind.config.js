/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        loading: {
          "0%, 100%": {
            transform: "translate(0rem,0rem)",
            opacity: 0,
          },
          "0%, 40%, 65%, 90%, 100%": {
            position: "absolute",
          },
          "40%, 65%, 90%": {
            opacity: 1,
          },
          "40%": {
            transform: "translate(.5rem,-1rem)",
          },
          "65%": {
            transform: "translate(1rem,0rem)",
          },
          "90%": {
            transform: "translate(.5rem,1rem)",
          },
        },
      },
      animation: {
        load: "loading 1.2s ease-in-out infinite",
      },
      colors: {
        "night-owl": {
          accent: {
            1: "#eeaa00",
            2: "#bf92e9",
            3: "#2be68e",
          },
          primary: "#2378cb",
          secondary: "#fa7c42",
          dark: {
            1: "#052b44",
            2: "#071524",
            3: "#010d18",
          },
        },
        discord: {
          accent: {
            1: "#23a55a",
            2: "#f0b232",
            3: "#c13a3e",
          },
          primary: "#5865f2",
          secondary: "#e9f0f5",
          dark: {
            1: "#313338",
            2: "#2b2d31",
            3: "#1e1f22",
          },
        },
      },
    },
  },
  plugins: [],
}
