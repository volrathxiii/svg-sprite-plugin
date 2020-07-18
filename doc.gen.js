const jsdoc2md = require('jsdoc-to-markdown')
const fs = require('fs')

jsdoc2md.render({files:'src/svg-sprite.js'}).then(data=>{
  fs.writeFileSync(`${__dirname}/docs/sass-functions.md`,data, (err)=>{
    console.log(err)
  })
})

jsdoc2md.render({files:'src/plugin.js'}).then(data=>{
  fs.writeFileSync(`${__dirname}/docs/plugin.md`,data, (err)=>{
    console.log(err)
  })
})