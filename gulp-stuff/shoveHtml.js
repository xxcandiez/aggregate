const fs = require('fs').promises

async function shoveHtml(dest) {
  await fs.copyFile('./html/index.html', `${dest}/index.html`)
  await fs.copyFile('./html/reset.css', `${dest}/reset.css`)
}

module.exports = shoveHtml
