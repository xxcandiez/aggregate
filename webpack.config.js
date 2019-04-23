const path = require('path')

module.exports = {
  entry: './dest/app.js',
  output: {
    path: path.resolve(__dirname, 'dest'),
    filename: 'bundle.js'
  },
  mode: 'development'
}
