const Loader = require('./BaseLoader')

class VideoLoader extends Loader {
  constructor(){
    super()
  }

  createRemoteVideo(src, cb){
    var tag = document.createElement('video');
    tag.autoplay = false;
    //LM: Firefox fails when this the preload="none" for other tags, but it needs to be "none" to ensure PreloadJS works.
    // tag.preload = "none";
    tag.src = src;
    this.subscribeMedia(tag, cb)
  }

  load(src, cb){
    this.createRemoteVideo(src, cb)
  }
}

module.exports = new VideoLoader()