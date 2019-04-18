const fs = require('fs').promises
const Path = require('./PathObj.js')
const rimraf = require('rimraf')
const transformFilep = require('./transformFilePromise.js')

/**
 * reads a directory to get a list of files and directories
 * @param path a string path to the directory you want to read
 * @returns a promise of an object with fields 'files', and 'dirs', which
 *   contain a list of files and directories respectively
 */
async function getFilesAndDirList(path, res={files: [], dirs: []}) {
  let options = {withFileTypes: true}
  let dirents = await fs.readdir(path, options)
  let dirent
  let newPath

  for(let i = 0; i < dirents.length; i++) {
    dirent = dirents[i]
    newPath = `${path}/${dirent.name}`

    if(dirent.isFile()) {
      res.files.push(newPath)
    } else if(dirent.isDirectory()) {
      res.dirs.push(newPath)
      await getFilesAndDirList(newPath, res)
    }
  }
  return res
}

/**
 * mirrors the folder structure of the source code into the dev build directory
 * @param dirs a list of paths to directories that exist in the folder you want
 *   to mirror
 * @param dest path to the destination folder
 */
async function setupFolderStructure(dirs, dest) {
  let dir

  await fs.mkdir(dest)

  for(let i = 0; i < dirs.length; i++) {
    dir = new Path(dirs[i]).setRoot(dest).getPath()
    await fs.mkdir(dir)
  }
}

/**
 * get result of transpiled files
 * @param pathList a list of paths to files
 * @return {Promise} of list of obj
 */
async function getTransformedFiles(pathList) {
  let res = []
  let path
  let contents

  for(let i = 0; i < pathList.length; i++) {
    path = pathList[i]
    contents = await transformFilep(path).then(res => res.code)

    res.push({
      path: path,
      contents: contents
    })
  }

  return res
}

/**
 * writes the transformed files
 * @param fileContentsList a list of obj that contains the 'path' and 'contents'
 *   to write
 */
async function writeTransformedFiles(fileContentsList) {
  let obj

  for(let i = 0; i < fileContentsList.length; i++) {
    obj = fileContentsList[i]
    console.log(obj.path, obj.contents)
    await fs.writeFile(obj.path, obj.contents)
  }
}

async function transpileSource(src, dest) {
  let filesAndDirList
  let transformedFiles

  filesAndDirList = await getFilesAndDirList(src)
  await setupFolderStructure(filesAndDirList.dirs, dest)

  transformedFiles = await getTransformedFiles(filesAndDirList.files)
  await writeTransformedFiles(transformedFiles)
}

transpileSource('./src', './dest')

module.exports = transpileSource
