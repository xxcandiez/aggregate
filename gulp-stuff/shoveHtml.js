const fs = require('fs').promises

async function shoveHtml(dest) {
  await fs.copyFile('./html/index.html', `${dest}/index.html`)
}

module.exports = shoveHtml
