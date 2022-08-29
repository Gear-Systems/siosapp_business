const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter var"', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        'fondo-gris': '#C4C4C4',
        'fondo-gris-claro': '#F2F2F2',
        'fondo-principal': '#E5E5E5',
        'blue-siosapp': '#2166E5',
        'azul-principal': '#E9F0FC',
        'azul-letras': '#2166E5',
        'poliza': '#2A708C',
        'poliza-2': '#558DA3',
        'poliza-3': '#7FA9BA',
        'megacable': '#3D90D9',
        'megacable-2': '#64A6E1',
        'megacable-3': '#8BBCE8',
        'infraestructura': '#131140',
        'infraestructura-2': '#424166',
        'infraestructura-3': '#71708C',
        'ventas': '#1B208C',
        'ventas-2': '#494DA3',
        'ventas-3': '#8D90C6',
        'texto-gris': '#7C8495',
      },
      boxShadow: {
        'right': '0 6px 15px -2px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)'
      },
      backgroundImage: {
        'fondo-tarjeta1': "url('/img/tarjeta_fondo_1.svg')",
      },
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/aspect-ratio'),
    require('flowbite/plugin'),
  ],
}
