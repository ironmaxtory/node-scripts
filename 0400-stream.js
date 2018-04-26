var http = require('http');

const server = http.createServer(function(req, res){
  // req 是 http.IncomingMessage 的实例，这是一个 Readable Stream
  // res 是 http.ServerResponse 的实例，这是一个 Writable Stream

  var reqBody = '';

  // 接收数据为 utf8 字符串，
  // 如果没有设置字符编码，将接收到 Buffer 对象。
  req.setEncoding('utf8');

  req.on('data', function(chunk){
    reqBody += chunk;
  });

  req.on('end', function(){
    console.log(reqBody);
    try {
      // var data = JSON.parse(reqBody);
      // res.statusCode = 200;
      res.write(reqBody);
      res.end();
    } catch (err) {
      // json 数据解析失败
      res.statusCode = 400;
      return res.end(`error: ${err.message}`);
    }
  });
});

server.listen(3004);
