const SVGSpriteClass = require('./svg-sprite');
const webpack = require('webpack')

/**
 * A `webpack`/`sass-loader` plugin that provides SASS 
 * functions to automatically generate SVG spritesheet.
 * @param {String} svgCompilePath Directory path where spritesheet will be stored
 * @example
 * // webpack.config.js
const SVGSpriteSheetPlugin = require('webpack-sass-svg');

module.exports = {
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          'css-loader',
          'sass-loader'
        ],
      }
    ],
  },
  ...
  plugins: [
    new SVGSpriteSheetPlugin(path.join(__dirname, 'dest'))
  ],
  ...
};
 * 
 */
class SVGSpritePlugin
{
  constructor(svgCompilePath)
  {
    if(typeof svgCompilePath === 'undefined') svgCompilePath = `${process.cwd()}/dest`

    let svgSprite = new SVGSpriteClass({
      spriteDest: svgCompilePath
    })

    return new webpack.NormalModuleReplacementPlugin(
      /\.s[ac]ss$/,
      function(resource) {
        if(typeof resource.loaders === 'undefined') return

        resource.loaders.map(item=>{
          
          if(item.loader.match(/node_modules\/sass-loader/)) {
            // @TODO refactor
            item.options = {
              implementation: require('node-sass'),
              sassOptions: { 
                functions: svgSprite.functions({})
              },
            }
            return item
          }
        })
      }
    );
  }
}

module.exports = SVGSpritePlugin