class SVGDataMapper
{
  constructor(data) {
    this.files = []

    data.css.shapes.forEach((item)=>{
      // remove svg data
      delete item.svg
      this.files[item.name] = item
    })

    // remove shapes from data
    this.sprite = data.css
    delete this.sprite.shapes
  }

  getFile(name) {
    return this.files[name]
  }
}

module.exports = SVGDataMapper