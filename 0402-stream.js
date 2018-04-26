var fs = require('fs')


fs.createReadStream('./assets/video.mp4')
  .pipe(fs.createWriteStream('./assets/video_pipe.mp4'));
