/**
 * makes working with paths easier, paths are assumed to be relative
 */
class Path {
  constructor(pathStr) {
    this.parts = pathStr.split('/')
  }

  getDepth() {
    return this.parts.length
  }

  getParent() {
    let res = ''
    let part

    for(let i = 0; i < this.parts.length - 1; i++) {
      part = this.parts[i]
      res += part
    }

    return res
  }

  getPath() {
    let res = ''
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

  setRoot(root) {
    let parts = root.split('/')
    for(let i = 0; i < parts.length; i++) {
      this.parts[i] = parts[i]
    }

    return this
  }
}

module.exports = Path
