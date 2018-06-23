const Loader = require('./BaseLoader')

class ImageLoader extends Loader {
  constructor(){
    super()
  }

  createRemoteImage(src, cb){
    var tag = document.createElement('img');
    tag.src = src;
    this.subscribeMedia(tag, cb)
  }

  load(src, cb){
    this.createRemoteImage(src, cb)
  }
}

module.exports = new ImageLoader()