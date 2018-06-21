const path = require('path');
const BabiliPlugin = require('babili-webpack-plugin');
const extracTextPlugin = require('extract-text-webpack-plugin');
const optimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const webpack = require('webpack');

let plugins = [];

plugins.push(new extracTextPlugin('styles.css'));

plugins.push(new webpack.ProvidePlugin({
  // vai carregar o jquery em uma variavel que é acessivel em cada modulo da aplicação, mas não esta em modo global.
  '$': 'jquery/dist/jquery.js', //$ - alias do jquery
  'jQuery': 'jquery/dist/jquery.js' // O nome da propriedade tem que ser igual ao que a aplicação está esperando
}));

plugins.push(new webpack.optimize.CommonsChunkPlugin({

  name: 'vendor',
  filename: 'vendor.bundle.js'

}))

if (process.env.NODE_ENV === 'production') {
  // faz com que o processamento ocorra mais rapidamente, diminiu a quantidade de closure (quanto mais closure mais trabalhoso)
  plugins.push(new webpack.optimize.ModuleConcatenationPlugin());

  plugins.push(new BabiliPlugin());

  plugins.push(new optimizeCSSAssetsPlugin({
    cssProcessor: require('cssnano'),
    cssProcessorOptions: {
      discardComments: {
        removeAll: true
      }
    },
    canPrint: true
  }));
}

module.exports = {
  entry: {
    app: './app-src/app.js', // Ponto de entrada da aplicação
    // vendor é exatamento o nome informado pelo identificador do CommonsChunkPlugin
    vendor: ['jquery', 'bootstrap', 'reflect-metadata']
  },
  output: { // Saida do processamento
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'dist' // Sem essa configuração o bundle(criado na memória) é criado na raiz, deve ser feito isso para a app conseguir carregar, obs isso foi configurado <script src="dist/bundle.js"></script> - configuração para o webpack-dev-server
  },
  module: { // Cria regras dos loaders que são utilizados para criação
    rules: [
      {
        // regras do js
        test: /\.js$/, // Essa chave utiliza expressão regular para saber as extensões que ela ira utilizar
        exclude: /node_modules/, // Arquivos que serão ignorados
        use: { // qual loader será utilizado.
          loader: 'babel-loader'
        }
      },
      {
        // regras do css
        test: /\.css$/,
        // loader: 'style-loader!css-loader'// ! siginifica que será executado 2 loaders, lembrando que sempre executa da direita para a esquerda
        // loader para separar o css do bundle gerado pra não ficar css e js misturado no mesmo arquivo
        use: extracTextPlugin.extract({
          fallback: 'style-loader', // caso falhe
          use: 'css-loader' // deu certo
        })
      },
      // regras para arquivos do bootstrap
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
      }
    ]
  },
  plugins // plugins: plugins - no ecmascript6 quando a variavel tem o mesmo nome da chave eu posso omitir ela.
};
