const express = require('express')

let app = express()

app.get('/', (req, res) => {
  // console.log(__dirname)
  let options = {
    root: `${__dirname}/dest`
  }
  res.sendFile('index.html', options)
  // res.sendFile('bundle.js', options)
})

app.get('/bundle.js', (req, res) => {
  let options = {
    root: `${__dirname}/dest`
  }
  res.sendFile('bundle.js', options)
})

app.get('/reset.css', (req, res) => {
  let options = {
    root: `${__dirname}/dest`
  }
  res.sendFile('reset.css', options)
})


app.listen(3000)
