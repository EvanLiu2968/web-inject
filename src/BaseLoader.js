/**
 * base Loader class
 */
module.exports = class Loader {
  constructor(){
    this.appendToHead.bind(this);
    this.appendToBody.bind(this);
  }

  asyncCallback(cb){
    setTimeout(function() {
      typeof cb == 'function' ? cb() : ''
    }, 100);
  }

  appendToHead(el){
    this.getHead().appendChild(el)
  }

  appendToBody(el){
    if (this.container == null) {
      this.container = document.createElement("div");
      this.container.id = "preload-container";
      var style = this.container.style;
      style.visibility = "hidden";
      style.position = "absolute";
      style.width = this.container.style.height = "10px";
      style.overflow = "hidden";
      style.transform = style.msTransform = style.webkitTransform = style.oTransform = "translate(-10px, -10px)"; //LM: Not working
      this.getBody().appendChild(this.container);
    }
    this.container.appendChild(el);
  }
  
  getHead () {
    return document.head || document.getElementsByTagName("head")[0];
  }

  getBody () {
    return document.body || document.getElementsByTagName("body")[0];
  }

  removeChild(el) {
    if (el.parent) {
      el.parent.removeChild(el);
    }
  }

  subscribeMedia(el, cb) {
    if (el.complete) {
      cb();
    } else {
      el.onload = function() {
        cb();
      };

      el.onerror = function(e) {
        cb();
      };
    }
  }

  isImageTag(item) {
    return item instanceof HTMLImageElement;
  }

  isAudioTag(item) {
    if (window.HTMLAudioElement) {
      return item instanceof HTMLAudioElement;
    } else {
      return false;
    }
  }

  isVideoTag(item) {
    if (window.HTMLVideoElement) {
      return item instanceof HTMLVideoElement;
    } else {
      return false;
    }
  }
}