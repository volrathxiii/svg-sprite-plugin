#!/usr/bin/env node

const SVGSpriter = require('svg-sprite')
const globBase = require('glob-base');
const path = require('path')
const fs = require('fs')
const glob = require('glob')
const mkdirp = require('mkdirp')
const argv = require('yargs')
  .usage('Usage: $0 <command> [options]')
  .command('svg-command', 'generates svg spritesheet')
  .describe('r', 'Root path for the svg files')
  .alias('r', 'svgRootPath') 
  .describe('d', 'Root path for builds')
  .alias('d', 'dest')
  .describe('s', 'destination for built sprite, relative to dest')
  .alias('s', 'spriteDest')
  .describe('f', 'File or glob')
  .alias('f', 'files')
  .describe('c', 'Current working directory')
  .alias('c', 'cwd')
  .describe('verbose', 'Display debug')
  .demandOption(['f'])
  .help('h')
  .alias('h', 'help')
  .epilog('copyright 2019')
  .argv;

var pathtofiles = argv.files.trim()
if(pathtofiles.indexOf('/') < 0) throw "SVG files not set, it should be in a folder relative to `svgRootPath`. You can also use `glob` to get multiple files.";
if(typeof options !== 'object') options = {}
let spriteBase = globBase(pathtofiles).base;
let spriteName = spriteBase.substring(spriteBase.lastIndexOf('/')+1);
let spriteFileName = `${spriteName}.svg`

const spriteDest = argv.spriteDest ? argv.spriteDest.trim() : 'svg'
const dest = argv.dest ? argv.dest.trim() : 'dest'

var spriter = new SVGSpriter({
  dest: `${dest}`,
  log: argv.verbose,
  mode: {
    css: {
      dest:'.',
      sprite: path.join(path.relative(dest,spriteDest),spriteFileName),
    }
  },
  shape: {
    id: {
      generator: function(file, val) { 
        let filename = path.basename(val.path)
        let name = filename.substring(0, filename.lastIndexOf('.'))
        return name
      },
      pseudo: '~',
      whitespace: '_'
    },
  }
})

// Use files specified
var files = glob.sync(`${pathtofiles}`)

files.forEach(function (file) {
  spriter.add(file, '', fs.readFileSync(file, {encoding: 'utf-8'}));
})

spriter.compile(function (error, result, data) {
  if(error) {
    console.log(error)
    data = {}
    throw "Fatal error cannot compile svg";
  }
  for (var mode in result) {
    for (var resource in result[mode]) {
        mkdirp.sync(path.dirname(result[mode][resource].path));
        fs.writeFileSync(result[mode][resource].path, result[mode][resource].contents);
    }
  }
  
  console.log(JSON.stringify(data)) // Show output
});