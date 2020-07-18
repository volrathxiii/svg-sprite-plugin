
const Types = require('node-sass').types
const globBase = require('glob-base');
const path = require('path')
const child_process = require('child_process');
const DataMapper = require('./mapper');
const { Console } = require('console');

function getData(pathtofiles, options)
{
  
  if(pathtofiles.indexOf('/') < 0) throw "SVG files not set, it should be in a folder relative to `svgRootPath`. You can also use `glob` to get multiple files.";
  if(typeof options !== 'object') options = {}
  
  const dest = options.dest ? options.dest : 'dest'
  const spriteDest = options.spriteDest ? options.spriteDest.trim() : 'svg'
  
  let execute = child_process.execFileSync('node', [
      `${__dirname}/svg-command.js`,
      `-f ${pathtofiles}`,
      `-s ${spriteDest}`,
      `-d ${dest}`,
    ])
  
  let data = JSON.parse(execute.toString())
  return data
}

class SVGSpriteClass
{
  constructor(param)
  {
    if(typeof param.spriteDest === 'undefined') throw `Requires params.spriteDest to continue.`
    this.params = param
    this.data = {}
  }

  functions(functionObject) {
    if(typeof functionObject !== 'object') functionObject = {}
    var _this = this

    /**
     * @method SVGSpriteMap
     * @description Generates a svg spritesheet
     * @returns {String} Path of the generated spritesheet
     * @param {String} files filename of svg. Use `glob` for multiple files
     * @example
     *  // style.scss
     *  $spritesheet: SVGSpriteMap("../assets/svg-sprite/*.svg");
     *  .sprite {
     *    background-image: $spritesheet;
     *  }
     *  // outputs
     *  .sprite {
     *    background-image: url(dest/svg-sprite-99bc9a72.svg); }
     */
    functionObject['SVGSpriteMap'] = function(files) {
      let baseDir = globBase(files.getValue());
      let fromPath = path.dirname(this.options.file)
      let targetPath = path.resolve(fromPath,baseDir.base)
      let target = path.join(targetPath, baseDir.glob)

      _this.params.dest = fromPath;

      let spriteData = getData(target, _this.params)
      let dataMapper = new DataMapper(spriteData)

      var result = `url(${spriteData.css.sprite})`
      _this.data[result] = dataMapper
      return new Types.String(result)
    }

    /**
     * @method SVGSpriteWidth
     * @description Returns the width of generated spritesheet
     * @returns {Number} Spritesheet width
     * @param {String} spritefile reference to {@link SVGSpriteMap}
     * @example
     *  // style.scss
     *  $spritesheet: SVGSpriteMap("../assets/svg-sprite/*.svg");
     *  .sprite {
     *    background-image: $spritesheet;
     *    background-size: SVGSpriteWidth($spritesheet) SVGSpriteHeight($spritesheet)
     *  }
     *  // outputs
     *  .sprite {
     *    background-image: url(dest/svg-sprite-99bc9a72.svg);
     *    background-size: 3361px 3344px; }
     */
    functionObject['SVGSpriteWidth'] = function(spritefile) {
      return new Types.Number(_this.data[spritefile.getValue()].sprite.spriteWidth, "px")
    }

    /**
     * @method SVGSpriteHeight
     * @description Returns the height of generated spritesheet
     * @returns {Number} Spritesheet height
     * @param {String} spritefile reference to {@link SVGSpriteMap}
     * @example
     *  // style.scss
     *  $spritesheet: SVGSpriteMap("../assets/svg-sprite/*.svg");
     *  .sprite {
     *    background-image: $spritesheet;
     *    background-size: SVGSpriteWidth($spritesheet) SVGSpriteHeight($spritesheet)
     *  }
     *  // outputs
     *  .sprite {
     *    background-image: url(dest/svg-sprite-99bc9a72.svg);
     *    background-size: 3361px 3344px; }
     */
    functionObject['SVGSpriteHeight'] = function(spritefile) {
      return new Types.Number(_this.data[spritefile.getValue()].sprite.spriteHeight, "px")
    }

    /**
     * @method SVGSpriteNames
     * @description Returns list of file names included in a spritesheet.
     * @returns {Array} Array of file names without extention
     * @param {String} spritefile reference to {@link SVGSpriteMap}
     * @example
     *  // style.scss
     *  $spritesheet: SVGSpriteMap("../assets/svg-sprite/*.svg");
     *  .names {
     *    --list: #{SVGSpriteNames($spritesheet)};
     *  }
     *  // outputs
     *  .names {
     *     --list: file1, file2, file3; }
     */
    functionObject['SVGSpriteNames'] = function(spritefile) {  
      let items = _this.data[spritefile.getValue()].files
      var list = new Types.List(Object.keys(items).length);
      var count = 0;
      Object.keys(items).forEach(name=>{
        list.setValue(count, new Types.String(name));
        count++;
      })
      return list
    }

    /**
     * @method SVGFileWidth
     * @description Returns the width of a specific SVG item/file
     * @returns {Number} Width of a file
     * @param {String} spritefile reference to {@link SVGSpriteMap}
     * @param {String} file name of an SVG file. See {@link SVGSpriteNames}
     * @example
     *  // style.scss
     *  $spritesheet: SVGSpriteMap("../assets/svg-sprite/*.svg");
     *  .style {
     *    width: SVGFileWidth($spritesheet, 'file3');
     *  }
     *  // outputs
     *  .style {
     *     width: 1641.48px; }
     */
    functionObject['SVGFileWidth'] = function(spritefile, file) {
      let data = _this.data[spritefile.getValue()].getFile(file.getValue());
      if(!data) throw `Cannot find sprite or file`
      return new Types.Number(data.width.outer, "px")
    }

    /**
     * @method SVGFileHeight
     * @description Returns the height of a specific SVG item/file
     * @returns {Number} height of a file
     * @param {String} spritefile reference to {@link SVGSpriteMap}
     * @param {String} file name of an SVG file. See {@link SVGSpriteNames}
     * @example
     *  // style.scss
     *  $spritesheet: SVGSpriteMap("../assets/svg-sprite/*.svg");
     *  .style {
     *    height: SVGFileHeight($spritesheet, 'file3');
     *  }
     *  // outputs
     *  .style {
     *     height: 1641.48px; }
     */
    functionObject['SVGFileHeight'] = function(spritefile, file) {
      let data = _this.data[spritefile.getValue()].getFile(file.getValue());
      if(!data) throw `Cannot find sprite or file`
      return new Types.Number(data.height.outer, "px")
    }

    /**
     * @method SVGFilePosition
     * @description Returns position coordinates of a file in a sprite
     * @returns {String} string of x and y axis
     * @param {String} spritefile reference to {@link SVGSpriteMap}
     * @param {String} file name of an SVG file. See {@link SVGSpriteNames}
     * @param {String} [method=relative] method of position [`relative`,`absolute`].
     * @example
     *  // style.scss
     *  $spritesheet: SVGSpriteMap("../assets/svg-sprite/*.svg");
     *  .style-relative {
     *    background-position: SVGFilePosition($spritesheet, 'circle');
     *  }
     *  .style-absolute {
     *    background-position: SVGFilePosition($spritesheet, 'circle', 'absolute');
     *  }
     *  // outputs
     *  .style-relative {
     *     background-position: 0 -1701.67px; }
     *  .style-absolute {
     *     background-position: 0 99.95007400794117%; }
     */
    functionObject['SVGFilePosition'] = function(spritefile, file, method) {
      let methods = ['relative', 'absolute']
      let userMethod = (typeof method === 'undefined') ? methods[0] : method.getValue()
      if(methods.indexOf(userMethod) < 0) throw `Invalid method`
      let data = _this.data[spritefile.getValue()].getFile(file.getValue());
      return new Types.String(data.position[userMethod].xy)
    }
  
    return functionObject;
  }
}

module.exports = SVGSpriteClass;