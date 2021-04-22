module.exports = {
  purge: [
      './src/**/*.{js,jsx,ts,tsx}',
      './public/index.html'
  ],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {},
    fontFamily: {
      sans: ['Poppins', 'sans-serif'],
      serif: ['Arvo', 'serif']
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
