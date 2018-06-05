const path = require('path');

module.exports = {
  entry: './app-src/app.js', // Ponto de entrada da aplicação
  output: { // Saida do processamento
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: { // Cria regras dos loaders que são utilizados para criação
    rules: [
      {
        test: /\.js$/, // Essa chave utiliza expressão regular para saber as extensões que ela ira utilizar
        exclude: /node_modules/, // Arquivos que serão ignorados
        use: { // qual loader será utilizado.
          loader: 'babel-loader'
        }
      }
    ]
  }
};
