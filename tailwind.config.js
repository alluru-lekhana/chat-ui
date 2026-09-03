/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ledger: {
          paper: '#F2EEE3',
          ink: '#1C2321',
          rule: '#C9BFA4',
          brass: '#8A6D3B',
          brasslight: '#B79A5D',
          flag: '#9A3B32',
        },
      },
      fontFamily: {
        serif: ['"Source Serif 4"', '"Georgia"', 'serif'],
        mono: ['"IBM Plex Mono"', '"Courier New"', 'monospace'],
      },
    },
  },
  plugins: [],
}
