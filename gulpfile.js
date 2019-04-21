const bundleFile = require('./gulp-stuff/bundleFiles.js')
const rimrafp = require('./gulp-stuff/rimrafPromise.js')
const transpileSource = require('./gulp-stuff/transpileSource.js')
const shoveHtml = require('./gulp-stuff/shoveHtml.js')
const gulp = require('gulp')

async function cleanUp() {
  await rimrafp('./dest')
}

async function makeDevBuild() {
  await transpileSource('./src', './dest')
  await shoveHtml('./dest')
}

async function build() {
  gulp.series(cleanUp, makeDevBuild, bundleFiles)
}

exports.makeDevBuild = makeDevBuild
exports.cleanUp = cleanUp
exports.both = gulp.series(cleanUp, makeDevBuild)
exports.bundleFiles = bundleFiles
