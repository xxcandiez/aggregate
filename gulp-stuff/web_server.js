const express = require('express')

let app = express()

app.get('/', (req, res) => {
  console.log(__dirname)

  let options = {
    root: `${__dirname}/public`
  }
  res.sendFile('index.html', options)
})

app.listen(3000)
