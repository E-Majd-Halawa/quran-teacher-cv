/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        night: {
          950: '#081812',
          900: '#0B1F16',
          800: '#102A1F',
          700: '#163A2A',
        },
        palm: {
          950: '#06261B',
          900: '#0C3826',
          800: '#0F4530',
          700: '#14573D',
          600: '#1B6B4C',
          500: '#237F5B',
        },
        sand: {
          50: '#FBF9F3',
          100: '#F6F2E7',
          200: '#EDE6D3',
        },
        gilt: {
          400: '#D8BE79',
          500: '#C7A855',
          600: '#AD8B3C',
        },
        ink: '#1A2420',
      },
      fontFamily: {
        arabicDisplay: ['"Aref Ruqaa"', 'serif'],
        arabicUI: ['"Tajawal"', 'sans-serif'],
        latinDisplay: ['"Cormorant Garamond"', 'serif'],
        latinUI: ['"Inter"', 'sans-serif'],
      },
      backgroundImage: {
        'geo-pattern':
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='84' height='84' viewBox='0 0 84 84'%3E%3Cg fill='none' stroke='%23C7A855' stroke-opacity='0.14' stroke-width='1'%3E%3Cpath d='M42 0 L84 42 L42 84 L0 42 Z'/%3E%3Ccircle cx='42' cy='42' r='20'/%3E%3C/g%3E%3C/svg%3E\")",
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(18px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        fadeUp: 'fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) both',
        shimmer: 'shimmer 2.5s linear infinite',
      },
    },
  },
  plugins: [],
};
