const Loader = require('./BaseLoader')

class ImageLoader extends Loader {
  constructor(){
    super()
  }

  createRemoteVideo(src, cb){
    var tag = document.createElement('img');
    tag.src = src;
    if (tag.complete) {
      successCallback(tag);
    } else {
      tag.onload = createjs.proxy(function() {
          successCallback(this._tag);
          tag.onload = tag.onerror = null;
      }, this);

      tag.onerror = createjs.proxy(function(event) {
          errorCallback(new createjs.ErrorEvent('IMAGE_FORMAT', null, event));
          tag.onload = tag.onerror = null;
      }, this);
    }
  }
}

module.exports = new ImageLoader()