const webpack = require('webpack')
const conf = require('../webpack.config.js')

function bundleFiles () {
  return new Promise((reject, resolve) => {
    webpack(conf, (err, stats) => {
      // console.log(err)
      // console.log(stats)
      resolve()
    })
  })
}

module.exports = bundleFiles
