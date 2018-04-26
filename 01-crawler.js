var http = require('http');
var url = require('url');
var querystring = require('querystring');
var cheerio = require('cheerio');

var href = 'http://www.imooc.com/learn/348';
var html = '';

var result = [];

function Chapter() {
  this.chapterTitle = '';
  this.videos = [];
}

function Video() {
  this.title  = '';
  this.id = '';
}

function parseHtml(htmlstr) {
  var $ = cheerio.load(htmlstr);
  $('.mod-chapters .chapter').each(function(index, item){
    // 每一章节
    var chapter = new Chapter();
    // 标题
    $(item).find('strong').get(0).childNodes.map(function(item){
      if (item.nodeType === 3) {
        var str = item.nodeValue.trim();
        if (str.length!==0) {
          chapter.chapterTitle = str;
        }
      }
    });
    // 视频
    $(item).find('.video li').each(function(index, item){
      var video = new Video();
      video.id = $(item).attr('data-media-id');
      var str = $(item).find('a').eq(0).text().trim().replace(/\s/g, '').replace(/[\r\n]/g, '').replace(/(开始学习)/g, '');
      (str.length>0) && (video.title=str);
      chapter.videos.push(video);
    });
    // 结果
    result.push(chapter);

  });
  console.log(JSON.stringify(result));
}


var req = http.get(href, function(res){
  console.log(`状态码: ${res.statusCode}`);
  res.setEncoding('utf8');
  res.on('data', function(chunk){
    html += chunk;
  })

  res.on('end', function(){
    console.log('已全部读取完毕');
    parseHtml(html);
    // console.log(html);
  })

  res.on('error', function(e){
    console.log(e);
  });
});

req.on('error', (e) => {
  console.error(`请求遇到问题: ${e.message}`);
});
