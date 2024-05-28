/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      base: {
        'color-1': '#34A853',
        'color-2': '#34A85399',
        'input-background-color': '#F6FCFE',
        'color-3': '#00000033',
      },
    },
  },
  plugins: [],
}
