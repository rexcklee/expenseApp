/**  @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./screens/*.{js,jsx,ts,tsx}", "./components/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        custom: {
          background: "#F6F4F0",
          first: "#4DA1A9",
          second: "#79D7BE",
          special: "#2E5077",
        },
        test1: {
          background: "#F6F4F0",
          first: "#4DA1A9",
          second: "#79D7BE",
          special: "#2E5077",
        },
      },
    },
  },
  plugins: [],
  experimental: { optimizeUniversalDefaults: true },
}

