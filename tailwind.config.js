/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        secondary: '#9333EA',
        success: '#10B981',
        light: '#F9FAFB',
        dark: '#111827'
      },
      fontFamily: {
        pacifico: ['Pacifico', 'cursive'],
        sans: ['system-ui', 'sans-serif']
      }
    },
  },
  plugins: [],
  darkMode: 'class'
}
