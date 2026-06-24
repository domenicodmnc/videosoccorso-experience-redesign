/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#153331',
        mist: '#f3f8f7',
        teal: {
          50: '#eefaf8', 100: '#d5f2ed', 200: '#abe4da', 300: '#78cebf',
          400: '#45b3a4', 500: '#299789', 600: '#1e796f', 700: '#1b625b',
          800: '#194f4a', 900: '#17423f'
        }
      },
      boxShadow: {
        soft: '0 18px 50px -26px rgba(21, 51, 49, 0.25)',
        card: '0 8px 30px -18px rgba(21, 51, 49, 0.25)'
      },
      fontFamily: { sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'] }
    }
  },
  plugins: []
}
