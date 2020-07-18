const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const SVGSpriteSheetPlugin = require('./src/plugin');

module.exports = {
  entry: './source/entry.js',
  output: {
    path: path.resolve(__dirname,'build'),
    filename: 'bundle.js'
  },

  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ],
      },
      {
        test: /\.(svg|png|jpe?g|gif)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'bundle.css'
    }),
    new SVGSpriteSheetPlugin('svgs')
  ],
  mode: 'development'
};