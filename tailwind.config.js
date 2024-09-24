/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'rgba(33, 150, 243, 1)',
        light: '#F6F3F9',
        gradient: 'linear-gradient(270deg, #2196F3 0%, #6A4FFD 100%)',
        black: '#000000',
        black2: '#646464',
        black3: '#8b8b8b',
        shade: '#121111',
        disable: '#f2f2f2',
        fa: '#fafafa',
        c4: '#c4c4c4',
        e5: '#e5e5e5',
        red: '#CC4424',
        red2: '#FCF5F4',
        success: '#009688',
        success2: '#EBF7F5',
        pend: '#EDBB00',
        blue: '#2196F3'
      }
    },
  },
  plugins: [],
}

