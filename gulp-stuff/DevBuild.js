const bundleFiles = require('./bundleFiles.js')
const fs = require('fs').promises
const transformFile = require('./transformFilePromise.js')

const Path = require('./PathObj.js')

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
   * please load beofre using other function
   * @return {Promise}
   */
  async load() {
    let data = await DevBuild.getFilesDirsRecur(this.src)
    this.files = data.files
    this.dirs = data.dirs

    let newFile
    let content
    this.transpileMap = []
    for(let i = 0; i < this.files.length; i++) {
      newFile = new Path(this.files[i]).setRoot(this.dest).getPath()
      content = await transformFile(this.files[i]).code
      this.transpileMap.push({path: newFile, content: content})
    }
  }

  /**
   * gets the names of the files and directories of a given directory
   * @private
   * @param {String} dir the path to a directory
   * @param {Object} res object that contains a list of files and directories
   * @return {Promise<Object>} lits of files and directories
   */
  static async getFilesDirsRecur(dir, res={files: [], dirs: []}) {

    if (res.dirs.length === 0) {res.dirs.push(dir)}

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
        await DevBuild.getFilesDirsRecur(newDir, res)
      }

    }

    return res
  }

  /**
   * copies the directory structure in 'this.src' to 'this.dest'
   * @return {Promise} that directory structure is copied
   */
  async buildDirStructure() {
    let dirs
    let dir

    // change dirs to path objects
    dirs = this.dirs.map((dir) => {
      return new Path(dir)
    })

    // sort the dirs by path depth
    dirs = dirs.sort((a, b) => {
      return a.getDepth() - b.getDepth()
    })

    // change the root of the dirs to the dest root
    dirs = dirs.map(dir => {
      return dir.setRoot(this.dest)
    })

    for(let i = 0; i < dirs.length; i++) {
      dir = dirs[i]
      // if dir does not already exist, fs.stat will error
      try {
        await fs.stat(dir.getPath())
      } catch(err) {
        await fs.mkdir(dir.getPath())
      }
    }
  }

  async writeTranspiledFiles() {
    let curr
    for(let i = 0; i < this.transpileMap.length; i++) {
      curr = this.transpileMap[i]
      await fs.writeFile(curr.path, curr.content)
    }
  }

  async bundleFiles() {
    await await bundleFiles()
  }
}

module.exports = DevBuild

// async function run() {
//   let x = new DevBuild('../src')
//   console.log(await x.getFiles())
//   console.log(await x.getDirs())
// }
//
// run()
