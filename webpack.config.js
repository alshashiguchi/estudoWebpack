const path = require('path');
const BabiliPlugin = require('babili-webpack-plugin');

let plugins = [];

if (process.env.NODE_ENV === 'production') {
  plugins.push(new BabiliPlugin());
}

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
  },
  plugins // plugins: plugins - no ecmascript6 quando a variavel tem o mesmo nome da chave eu posso omitir ela.
};
