/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
     keyframes: {
       pulse: {
         '0%, 100%': { opacity: 1 },
         '50%': { opacity: 0 },
       }
     },
     animation: {
       pulse: 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
       
     }
    },
  },
  plugins: [],
}
