import type { Config } from 'tailwindcss'

const defaultTheme = require('tailwindcss/defaultTheme')
/*
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        'sans': ['"Proxima Nova"', ...defaultTheme.fontFamily.sans],
      },
    }
  }
}*/
const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },fontFamily: {
        'serif': ['"Croissant One"', ...defaultTheme.fontFamily.serif],
      }
    },
  },
  plugins: [],
}
export default config
