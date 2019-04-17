const babel = require('@babel/core')
const fs = require('fs').promises
const Path = require('./PathObj.js')

// TODO: take the files in src shove them through babel then place them in dist

/**
 * gets a list of file names
 * @param directory a string that is the dir name
 * @returns promise an object with two lists, 'files', and 'dirs'
 */
async function readdirr(path, res={files: [], dirs: []}, options={withFileTypes: true}) {
  let dirents = await fs.readdir(path, options)
  let dirent

  for(let i = 0; i < dirents.length; i++) {
    dirent = dirents[i]

    if(dirent.isFile()) {
      res.files.push(`${path}/${dirent.name}`)
    } else if (dirent.isDirectory()) {
      path = `${path}/${dirent.name}`
      res.dirs.push(path)
      await readdirr(path, res=res)
    }
  }

  return res
}

async function transform(promisedFilesObj) {
  let filesObj = await promisedFilesObj
  let regex = RegExp('.js$')
  let files
  let path
  let stat
  let file
  let dir
  let contents

  files = filesObj.files.filter(file => regex.test(file))
  dirs = filesObj.dirs

  console.log(files)
  console.log(dirs)
  await fs.rmdir('./dist')

  for(let i = 0; i < dirs.length; i++) {
    dir = dirs[i]
    path = new Path(dir).setRoot('dist').getPath()
    await fs.mkdir(path)
  }

  for(let i = 0; i < files.length; i++) {
    file = files[i]
    contents = await transformFilePromise(file)
    path = new Path(file).setRoot('dist').getPath()
    await fs.writeFile(path, contents)
  }
}

// make directories before making files

/**
 * @param file path of file you want to transform
 * returns promise of result of shoving a file through babel
 */
function transformFilePromise(file) {
  return new Promise((resolve, reject) => {
    babel.transformFile(file, (err, res) => {
      resolve(res)
    })
  })
}

async function writeToFile(filePath, content) {

}

transform(readdirr('src'))



// babel.transformFile('src/App.js', (err, res) => {
//   console.log(res.code)
// })
