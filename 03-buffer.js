var fs = require('fs')

var log = console.log

fs.readFile('./assets/favicon.ico', function(err, data){
  if (err) {
    log(err)
  }

  log(Buffer.isBuffer(data))

  fs.writeFile('./assets/logo_clone.ico', data.toString('base64'), {encoding:'base64'}, function(err){
    if (err) {
      log(err)
    }
  })
});
