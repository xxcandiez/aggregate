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
   * gets files, dirs
   * @return {Promise} [description]
   */
  async update() {

  }

  /**
   * gets a list of files in source directory
   * @return {Promise<Array>} array of names files contained in 'this.src'
   */
  async getFiles() {
    let files = (await DevBuild.getFilesDirsRecur(this.src)).files
    return await files
  }

  /**
   * gets a list of directories
   * @return {Promise<Array>} array of names of directories in 'this.src'
   */
  async getDirs() {
    let dirs = (await DevBuild.getFilesDirsRecur(this.src)).dirs
    return await dirs
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
    let dirs = await this.getDirs()
    let dir

    // change dirs to path objects
    dirs = dirs.map((dir) => {
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

  async transpileAndWriteFiles() {
    let res = await this.transpileFiles()
    this.writeTranspiledFiles(res)
  }

  /**
   * transpiles and stores files in 'this.src'
   * @return {Promise<Array>} Promise of Array of obj with attributes path, and
   *   content
   */
  async transpileFiles() {
    let files = await this.getFiles()
    let res = []
    let file
    let content

    for(let i = 0; i < files.length; i++) {
      file = files[i]
      content = (await transformFile(file)).code
      file = new Path(file).setRoot(this.dest).getPath()
      res.push({
        path: file,
        content: content
      })
    }

    return res
  }

  async writeTranspiledFiles(transpileFilesRes) {
    let curr
    for(let i = 0; i < transpileFilesRes.length; i++) {
      curr = transpileFilesRes[i]
      await fs.writeFile(curr.path, curr.content)
    }
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
