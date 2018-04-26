var EventEmitter = require('events').EventEmitter;
var log = console.log;
var emitter = new EventEmitter();

emitter.on('say', function(what, toWho){
  log('%s World, %s', what, toWho);
})


emitter.emit('say', 'Hello', 'Hades');
