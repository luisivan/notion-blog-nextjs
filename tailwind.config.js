module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            a: {
              color: '#5d93ff !important',
              fontWeight: 400,
              textDecoration: 'none',
            },
            blockquote: {
              fontWeight: 400,
              borderColor: '#6435c9',
              transform: 'translateX(-1.25rem)',
            },
          },
        },
      },
    },
    fontFamily: {
      display: ['Inter'],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
}
