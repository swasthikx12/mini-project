/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary: {
  				DEFAULT: '#1c1c22',
  			},
  			accent: {
  				default: '#00ff99',
  				
  			},
      },
      keyframes: {
        shock: {
          '0%, 100%': { transform: 'scale(1)', opacity: 1 },
          '50%': { transform: 'scale(1.2)', opacity: 0.8 },
        },
      },
      animation: {
        shock: 'shock 0.5s ease-in-out infinite', // Animation name, duration, easing, repeat
      },
    
    },
  },
  plugins: [],
}