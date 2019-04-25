const fs = require('fs').promises
const Path = require('./PathObj.js')
const rimraf = require('rimraf')
const transformFilep = require('./transformFilePromise.js')


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
    contents = await transformFilep(path)
    contents = contents.code

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
async function writeTransformedFiles(fileContentsList, dest) {
  let obj

  for(let i = 0; i < fileContentsList.length; i++) {
    obj = fileContentsList[i]

    // this line is important
    newPath = new Path(obj.path).setRoot(dest).getPath()
    await fs.writeFile(newPath, obj.contents)
  }
}

async function transpileSource(src, dest) {
  let filesAndDirList
  let transformedFiles

  filesAndDirList = await getFilesAndDirList(src)
  await setupFolderStructure(filesAndDirList.dirs, dest)

  transformedFiles = await getTransformedFiles(filesAndDirList.files)
  await writeTransformedFiles(transformedFiles, dest)
}

module.exports = transpileSource
