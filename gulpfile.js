const bundleFiles = require('./gulp-stuff/bundleFiles.js')
const rimrafp = require('./gulp-stuff/rimrafPromise.js')
const transpileSource = require('./gulp-stuff/transpileSource.js')
const shoveHtml = require('./gulp-stuff/shoveHtml.js')
const gulp = require('gulp')
const exec = require('child_process').exec

/**
 * deletes the folder which contains the development build
 * @return {Promise} that dev build will be deleted
 */
async function deleteDevBuild() {
  await rimrafp('./dest')
}



async function makeDevBuild() {
  await transpileSource('./src', './dest')
  await shoveHtml('./dest')
}

function startServer(cb) {
  exec('node ./web_server.js', function(err, stdout, stderr) {
    cb()
  })
}

async function watcher() {
  gulp.watch()
}

let build = gulp.series(cleanUp, makeDevBuild, bundleFiles, startServer)

exports.build = build
exports.bundle = bundleFiles
exports.watcher = gulp.watch('./src/**/*', build)
exports.startServer = startServer
