/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#F1F6FF',
          100: '#DEE9FF',
          200: '#C2D6FF',
          300: '#95B7FF',
          400: '#6190FF',
          500: '#3B6BF5',
          600: '#244FE0',
          700: '#1C3DBB',
          800: '#1B348F',
          900: '#16285F',
          950: '#0B1738',
        },
        ink: {
          500: '#1B3B58',
          600: '#16324C',
          700: '#102A45',
          800: '#0B1D33',
          900: '#071426',
          950: '#040C18',
        },
        grass: {
          50: '#ECFDF3',
          100: '#D1FADF',
          200: '#A6F4C5',
          400: '#34D399',
          500: '#12B76A',
          600: '#079455',
          700: '#05603A',
        },
        gold: {
          100: '#FEF3C7',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(7, 20, 38, 0.06), 0 12px 32px -12px rgba(7, 20, 38, 0.18)',
        float: '0 18px 40px -18px rgba(7, 20, 38, 0.35)',
        glow: '0 0 0 3px rgba(59, 107, 245, 0.18)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.45' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.45s ease-out both',
        'pulse-soft': 'pulse-soft 1.8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
