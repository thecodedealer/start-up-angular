const path = require('path');
const webpack = require('webpack');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MinifyPlugin = require('babel-minify-webpack-plugin');
const BumpPlugin = require("bump-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');


const build = process.argv.indexOf('build') !== -1;

const targetDir = path.resolve(__dirname, './www/dist');
const cssDir = path.resolve(__dirname, './www/dist');

const extractSass = new ExtractTextPlugin({
  filename: './www/dist/bundle.css',
  disable: !build
});


const config = {
  entry: {
    app: './www/js/app.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: targetDir
  },
  performance: {
    hints: false
  },
  plugins: [
    new CleanWebpackPlugin([targetDir]),
    new CleanWebpackPlugin([cssDir]),


    extractSass,

    new BrowserSyncPlugin({
      // browse to http://localhost:3000/ during development,
      // ./public directory is being served
      host: 'localhost',
      port: 3000,
      server: {
        baseDir: ['./www']
      }
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules|bower_components/,
        loader: 'babel-loader',
        query: {}
      },
      {
        test: /\.scss$/,
        use: extractSass.extract({
          use: [
            {
              loader: "css-loader",
              options: {url: false, minimize: build}
            },
            {
              loader: "sass-loader"
            },
            {
              loader: 'postcss-loader'
            }
          ],
          // use style-loader in development
          fallback: "style-loader"
        })
      }

    ]
  },
  mode: 'none'
};


if (build) {
  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }));
  config.plugins.push(new MinifyPlugin());
  config.plugins.push(new BumpPlugin([
    'package.json'
  ]));
} else{
  config.plugins.push(new BundleAnalyzerPlugin({analyzerPort: 8888}));
  config.watchOptions = {
    aggregateTimeout: 300,
    poll: 1000
  };
}


module.exports = config;
