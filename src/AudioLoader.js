const Loader = require('./BaseLoader')

class AudioLoader extends Loader {
  constructor(){
    super()
  }

  createRemoteAudio(src, cb){
    var tag = document.createElement('audio');
    tag.autoplay = false;
    //LM: Firefox fails when this the preload="none" for other tags, but it needs to be "none" to ensure PreloadJS works.
    tag.preload = "none";
    tag.src = src;
  }
}

module.exports = new AudioLoader()