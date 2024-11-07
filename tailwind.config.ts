import { type Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';

export default {
  content: ['./src/**/*.{tsx,ts}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', ...fontFamily.sans],
        mono: ['Roboto', ...fontFamily.mono],
      },
      colors: {
        primary: 'var(--primary-color)',
        'primary-content': 'var(--primary-content-color)',
        'primary-light': 'var(--primary-light-color)',
        secondary: 'var(--secondary-color)',
        'secondary-content': 'var(--secondary-content-color)',
        'secondary-light': 'var(--secondary-light-color)',
        accent: 'var(--accent-color)',
        'accent-content': 'var(--accent-content-color)',
        'accent-light': 'var(--accent-light-color)',
        neutral: 'var(--neutral-color)',
        'neutral-content': 'var(--neutral-content-color)',
        'neutral-light': 'var(--neutral-light-color)',
      },
    },
  },
  plugins: [],
} satisfies Config;
