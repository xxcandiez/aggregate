const fs = require('fs').promises


class DevBuild {
  /**
   * @param {String} src path to the source folder
   * @param {String} dest path to the destination folder
   */
  constructor(src, dest) {
    this.src = src
    this.dest = dest
  }

  /**
   * gets a list of files in source directory
   * @return {Promise<Array>} array of names files contained in 'this.src'
   */
  async getFiles() {
    let files = (await this._getFilesDirsRecur()).files
    return await files
  }

  /**
   * gets a list of directories
   * @return {Promise<Array>} array of names of directories in 'this.src'
   */
  async getDirs() {
    let dirs = (await this._getFilesDirsRecur()).dirs
    return await dirs
  }

  /**
   * gets the names of the files and directories of a given directory
   * @private
   * @param {String} dir the path to a directory, defaults to 'this.src'
   * @param {Object} res object that contains a list of files and directories
   * @return {Promise<Object>} lits of files and directories
   */
  async _getFilesDirsRecur(dir, res={files: [], dirs: []}) {

    dir = dir || this.src
    if (res.dirs.length === 0) {res.dirs.push(this.src)}

    let options = {withFileTypes: true}
    let dirents = await fs.readdir(dir, options)
    let dirent
    let newDir

    for(let i = 0; i < dirents.length; i++) {

      dirent = dirents[i]
      newDir = `${dir}/${dirent.name}`

      if(dirent.isFile()) {
        res.files.push(newDir)
      } else if(dirent.isDirectory()) {
        res.dirs.push(newDir)
        await this._getFilesDirsRecur(newDir, res)
      }

    }

    return res
  }

  async buildDirStructure() {
    let dirs = (await this.getDirs()).sort((a, b) => {
      a = new Path(a).getDepth()
      b = new Path(b).getDepth()
      return a - b
    })
    let dir

    for(let i = 0; i < dirs.length; i++) {
      dir = dirs[i]
    }
  }
}

async function run() {
  let x = new DevBuild('../src')
  console.log(await x.getFiles())
  console.log(await x.getDirs())
}

// run()
