/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{vue,js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'neutral' : '#f6eef0',
        'primary' : '#30535f',
        'secondary' : '#090f13',
        'tertiary' : '#153b47',
        'quaternary' : '#3d606e',
        'quinary' : '#09191f',
      },
      fontFamily: {
        'nanum-gothic': ['"Nanum Gothic"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

