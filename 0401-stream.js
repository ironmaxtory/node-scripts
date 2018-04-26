var fs = require('fs')
var log = console.log
var n = 0;

var readStream = fs.createReadStream('./assets/video.mp4')
var writeStream = fs.createWriteStream('./assets/video_clone.mp4')

readStream.on('readable', function () {
  log('> File Readable.')
})

readStream.on('error', function () {
  log('> File Reading Error.')
})

readStream.on('data', function (chunk) {
  log('> File is Reading...')
  n++

  readStream.pause

  writeStream.write(chunk, function(){
    readStream.isPaused() && readStream.resume()
  })

  // setTimeout(function(){
  //   readStream.isPaused() && readStream.resume()
  // }, 10)
})


readStream.on('end', function () {
  log('> File Readed. %s chunked in total', n)

  writeStream.end()
})
