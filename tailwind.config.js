/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "custom-sea-green": "#093545",
        "login-button-green": "#2BD17E",
        "input-green": "#224957",
        "card-color": "#092C39",
      },
    },
    fontFamily: {
      montserrat: ["Montserrat", "sans-serif"],
    },
    height: {
      "custom-calc": "calc(100vh - 230px)", // Example: full height minus 100px
    },
  },
  plugins: [],
};
