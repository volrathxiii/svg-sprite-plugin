# SVGSpritePlugin

A `webpack`/`sass-loader` plugin that provides SASS functions to automatically generate SVG spritesheet.


## How to use
You can install the package using `npm` or you can also clone this package.
### Install using npm
```javascript
npm install --save-dev webpack-sass-svg
```
### Add to webpack
Depending on your project setup, you can either add the following to your `package.json` or `webpack.config.js`. 

_This requires you to have installed and use `sass-loader`._

```javascript
const SVGSpriteSheetPlugin = require('webpack-sass-svg');
module.exports = {
  // ... other config
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          'sass-loader' // sass-loader should be defined
        ],
      },
    ],
  },
  plugins: [
    // ... other plugins
    new SVGSpriteSheetPlugin( '___PATH_TO_COMPILE_DIR___' )
  ],
};
```

## Use in your project
After setting up `webpack`, you can now use the SASS functions in your `.sass`/`.scss` files. 

#### Example:
```scss
$spritesheet: SVGSpriteMap("../assets/svg-sprite/**/*.svg");
.svg-sprite {
  background-image: $spritesheet;
  background-size: SVGSpriteWidth($spritesheet) SVGSpriteHeight($spritesheet);
  background-repeat: no-repeat;
}

.svg-circle {
  width: SVGFileWidth($spritesheet, 'circle');
  height: SVGFileHeight($spritesheet, 'circle');
  background-position: SVGFilePosition($spritesheet, 'circle', 'relative');
}
```

## Documentation
* [Webpack Plugin](docs/plugin.md)
* [Added SASS functions](docs/sass-functions.md)

### TODO
* Add tests
* Use Typescript