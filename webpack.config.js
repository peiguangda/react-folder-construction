var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin =  require('extract-text-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
var webpack = require('webpack');

var basePath = __dirname;

const extractCSS = new ExtractTextPlugin({
  filename: 'css/[name].css?v=[hash]',
});

module.exports = {
  context: path.join(basePath, 'src'),
  resolve: {
    alias: {
      _images: `${basePath}/public/images`,
    },
    extensions: ['.js', '.ts', '.tsx']
  },
  entry: {
    // app: './index.tsx',
    app: ['babel-polyfill', './index.tsx'],
    appStyles: '../public/css/bootstrap.min.css',
    vendor: [
      'react',
      'react-dom',
      'react-router',
      'redux',
      'react-redux',
      'redux-thunk',
    ]
  },
  output: {
    path: path.join(basePath, 'dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'awesome-typescript-loader',
        options: {
          useBabel: true,
        },
      },
      {
        test: /\.sass|scss|\.scss|\.css$/,
        use: extractCSS.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                camelCase: true,
                url: false,
                minimize: true,
                sourceMap: true,
                modules: false,
                localIdentName: '[local]--[hash:base64:12]',
              },
            },
          ],
        }),
      },
      // Loading glyphicons => https://github.com/gowravshekar/bootstrap-webpack
      // Using here url-loader and file-loader
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
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              mimetype: 'image/png'
            }
          }
        ]
      },
    ],
  },
  // For development https://webpack.js.org/configuration/devtool/#for-development
  devtool: 'inline-source-map',
  devServer: {
    historyApiFallback: true,
    port: 8080,
    noInfo: true,
  },
  plugins: [
    //Generate index.html in /dist => https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html', //Name of file in ./dist/
      template: '../public/index.html', //Name of template in ./src
      hash: true,
    }),
    /* new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest'],
    }), */
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      minChunks(module) {
        // this assumes your vendor imports exist in the node_modules directory
        if (
          module.resource &&
          /^.*\.(css|scss|sass|less)$/.test(module.resource)
        ) {
          return false;
        }
        if(module.context && (/lib/).test(module.context)){
          return false;
        }
        return module.context && module.context.indexOf("node_modules") !== -1;
      }
    }),  
    new webpack.optimize.CommonsChunkPlugin({
      name: "manifest",
      minChunks: Infinity
    }),
    //new webpack.optimize.UglifyJsPlugin({ sourcemap: false }),
    new UglifyJsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    extractCSS
  ],
  resolve: {
    modules: [
      path.resolve(path.join(basePath, 'src')),
      path.resolve(path.join(basePath, 'public')),
      path.resolve('./node_modules')
    ],
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx', 'png', 'jpg', 'svg'],
  },
  node:{
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
};
