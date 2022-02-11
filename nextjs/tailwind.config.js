// Neste projeto utilizaremos Tailwind para organizar nosso CSS
// Ele funciona com PostCSS (gerado com pós processamento através de classes já existentes em nossos elementos)
// Aqui estamos configurando os arquivos que ele irá analisar para gerar as estilizações indicadas, no nosso caso, todas as nossas páginas e componentes

module.exports = {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

// Baixamos tailwindcss, postcss e autoprefixer
