let exec = require('child_process').exec
try {
  exec('./web_server.js')
} catch(err) {
  console.log(err)
}
