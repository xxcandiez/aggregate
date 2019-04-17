class Path {
  constructor(pathStr) {
    this.parts = pathStr.split('/')
  }

  setRoot(root) {
    this.parts[0] = root
    return this
  }

  getPath() {
    let res = './'
    let part
    for(let i = 0; i < this.parts.length; i++) {
      part = this.parts[i]
      res += part
      if(i != this.parts.length - 1) {
        res += '/'
      }
    }
    return res
  }
}

module.exports = Path
