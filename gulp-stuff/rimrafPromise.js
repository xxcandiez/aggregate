const rimraf = require('rimraf')

/**
 * rimraf but with a promise api
 * @param dir the dir that you want to rimraf
 * @returns promise that rimraf will be done
 */
function rimrafPromise(dir) {
  return new Promise((resolve, reject) => {
    rimraf(dir, () => {
      resolve()
    })
  })
}

module.exports = rimrafPromise
