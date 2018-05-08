const Loader = require('./BaseLoader')

class VideoLoader extends Loader {
  constructor(){
    super()
  }

  createRemoteVideo(src, cb){
    var tag = document.createElement('video');
  }
}

module.exports = new VideoLoader()