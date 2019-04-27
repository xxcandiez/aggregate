const bundleFiles = require('./gulp-stuff/bundleFiles.js')
const gulp = require('gulp')
const puppeteer = require('puppeteer')
const shoveHtml = require('./gulp-stuff/shoveHtml.js')

const DevBuild = require('./gulp-stuff/DevBuild.js')

// don't touch please .-.
var browser
var page
(async() => {
  browser = await puppeteer.launch({
    headless: false
  })

  page = (await browser.pages())[0]
  page.setViewport({width: 1920, height: 1080})
  await page.goto('localhost:3000')
})()

async function reload() {
  await page.reload()
}

async function devBuild() {
  let devBuild = new DevBuild('./src', './dest')
  await devBuild.load()
  await devBuild.buildDirStructure()
  await devBuild.writeTranspiledFiles()
  await devBuild.bundleFiles()
  await shoveHtml('./dest')
  await reload()
}

async function watcher() {
  gulp.watch('./src/**.js', devBuild)
}

exports.watcher = watcher
exports.devBuild = devBuild
