module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: 'var(--color-primary-50)',
          100: 'var(--color-primary-100)',
          500: 'var(--color-primary-500)',
          700: 'var(--color-primary-700)',
        },
        accent: {
          500: 'var(--color-accent-500)',
        },
      },
    },
  },
  plugins: [],
};
