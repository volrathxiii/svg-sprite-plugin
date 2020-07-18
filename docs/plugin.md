<a name="SVGSpritePlugin"></a>

## SVGSpritePlugin
A `webpack`/`sass-loader` plugin that provides SASS 
functions to automatically generate SVG spritesheet.

**Kind**: global class  
<a name="new_SVGSpritePlugin_new"></a>

### new SVGSpritePlugin(svgCompilePath)

| Param | Type | Description |
| --- | --- | --- |
| svgCompilePath | <code>String</code> | Directory path where spritesheet will be stored |

**Example**  
```js
// webpack.config.js
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
```
