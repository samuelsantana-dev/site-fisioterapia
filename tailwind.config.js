/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        backgroundMain: '#32c3d36b',
        backgroundSecondary: '#32c3d3',
        backgroundHeaderFooter: '#08b5c9',
        backgroundBlack: '#000000',
        backgroundButton: '#1a717db4',
        backgroundButtonHover: '#057483',
      },
      textColors: {
        color: 'rgb(255, 255, 255)',
        colorBlack: 'rgb(2, 2, 2)',
        colorTitle: '#02414d',
        colorParagraph: '#02414d',

      }, 
      fontSize: {
        'sm': '0.875rem', // Tamanho pequeno
        'base': '1rem', // Tamanho base (padrão)
        'lg': '1.125rem', // Tamanho grande
        'xl': '1.25rem', // Tamanho extra grande
      }
    },
  },
  plugins: [require("daisyui")],
}