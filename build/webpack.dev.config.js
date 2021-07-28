const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const ESLintPlugin = require('eslint-webpack-plugin');

const config = {
  target: 'web',
  mode: 'development',
  entry: {
    main: './src/main.js'
  },
  resolve: {
    alias: {
      '@': path.join(__dirname, '../src')
    },
    extensions: ['.js', '.vue', '.json']
  },
  devtool: 'source-map',
  stats: 'errors-warnings',
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          'vue-loader'
        ],
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        // 缓存转换出的结果
        exclude: /node_modules/,
        options: {
          cacheDirectory: true
        }
      },
      {
        test: /\.s?css$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'images/[name].[ext]',
          esModule: false
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'media/[name].[ext]',
          esModule: false
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'fonts/[name].[ext]',
          esModule: false
        }
      }
    ]
  },
  devServer: {
    serveIndex: true,
    port: 8888,
    hot: true,
    historyApiFallback: true,
    contentBase: path.join(__dirname, '../public'),
    // overlay: true,
    clientLogLevel: 'info'
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name].js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../index.html')
    }),
    new VueLoaderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new ESLintPlugin({
      formatter: require('eslint-friendly-formatter'),
      extensions: ['.js', '.vue']
    })
  ]
};

module.exports = config;
