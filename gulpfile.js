const rimrafp = require('./gulp-stuff/rimrafPromise.js')
const transpileSource = require('./gulp-stuff/transpileSource.js')

async function cleanUp() {
  await rimrafp('./dist')
}

async function makeDevBuild() {
  await transpileSource('./src', './dest')
}

exports.makeDevBuild = makeDevBuild
exports.cleanUp = cleanUp
