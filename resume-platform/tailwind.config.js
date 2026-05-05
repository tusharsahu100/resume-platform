/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'gh-blue': '#0969da',
        'gh-dark': '#24292f',
        'gh-light': '#57606a',
        'gh-border': '#d0d7de',
        'gh-bg': '#f6f8fa',
      },
      fontFamily: {
        'sans': ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
