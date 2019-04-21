const babel = require('@babel/core')


/**
 * @param file path of file you want to transform
 * returns promise of result of shoving a file through babel
 */
function transformFilePromise(file) {
  return new Promise((resolve, reject) => {
    babel.transformFile(file, (err, res) => {
      // console.log(err)
      // console.log(res)
      resolve(res)
    })
  })
}

module.exports = transformFilePromise
