module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'media',
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
      display: ['var(--font-inter)'],
    },
    screens: {
      xs: '480px',
      sm: '640px',
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
}
