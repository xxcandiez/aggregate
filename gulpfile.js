const bundleFiles = require('./gulp-stuff/bundleFiles.js')
const shoveHtml = require('./gulp-stuff/shoveHtml.js')
const gulp = require('gulp')
const DevBuild = require('./gulp-stuff/DevBuild.js')


async function test() {
  let devBuild = new DevBuild('./src', './dest')
  await devBuild.buildDirStructure()
  await devBuild.transpileAndWriteFiles()
  await shoveHtml('./dest')
}

async function watcher() {
  gulp.watch()
}

exports.build = build
exports.bundle = bundleFiles
// exports.watcher = gulp.watch('./src/**/*', build)
exports.startServer = startServer
exports.test = test
