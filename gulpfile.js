const bundleFiles = require('./gulp-stuff/bundleFiles.js')
const bs = require('browser-sync').create()
const shoveHtml = require('./gulp-stuff/shoveHtml.js')
const gulp = require('gulp')
const DevBuild = require('./gulp-stuff/DevBuild.js')

function stuff(cb) {
  bs.init({}, cb)
}

async function devBuild() {
  let devBuild = new DevBuild('./src', './dest')
  await devBuild.load()
  await devBuild.buildDirStructure()
  await devBuild.writeTranspiledFiles()
  await devBuild.bundleFiles()
  await shoveHtml('./dest')
}

async function watcher() {
  gulp.watch('./src/**.js', devBuild)
}

exports.watcher = watcher
exports.devBuild = devBuild
exports.stuff = stuff
