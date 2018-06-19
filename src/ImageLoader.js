const Loader = require('./BaseLoader')

class ImageLoader extends Loader {
  constructor(){
    super()
  }

  createRemoteImage(src, cb){
    var tag = document.createElement('img');
    tag.src = src;
    if (tag.complete) {
      cb(tag);
    } else {
      tag.onload = function() {
        cb(tag);
      };

      tag.onerror = function(e) {
        cb(tag);
      };
    }
  }

  load(src, cb){
    this.createRemoteImage(src, cb)
  }
}

module.exports = new ImageLoader()