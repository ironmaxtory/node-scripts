var fs = require('fs')
var stream = require('stream')

var Readable = stream.Readable
var Writable = stream.Writable

var readStream = new Readable()
var writeStream = new Writable()

readStream.push('I ')
readStream.push('LOVE ')
readStream.push('TECH ')
readStream.push(null)

writeStream._write = function(chunk, encode, cb){
  console.log(chunk.toString())

  cb()
}

readStream.pipe(writeStream)
