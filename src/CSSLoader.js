const Loader = require('./BaseLoader')

class CSSLoader extends Loader {
  constructor(){
    super()
  }

  createRemoteCSS(src, cb){
    const self = this
    var tag = document.createElement('link');
    tag.onload = tag.onreadystatechange = function(){
      if( ! this.readyState || this.readyState=='loaded' || this.readyState=='complete' ){
        self.asyncCallback(cb)
      }
    }
  
    if (src.lastIndexOf('.css')==-1) src += '.css';
    tag.setAttribute("rel", 'stylesheet');
    tag.setAttribute("href", src);

    this.appendToHead(tag)
  }

  createInnerCSS(cssCode, cb){
    var tag = document.createElement('style'); // w3c
    tag.setAttribute("rel", "stylesheet");
    tag.setAttribute("type", "text/css");

    this.appendToHead(tag)
  
    var media = tag.getAttribute("media");
    if (media != null && !/screen/.test(media.toLowerCase())) {
      tag.setAttribute("media", "screen");
    }
    if (tag.styleSheet) {    // IE
      tag.styleSheet.cssText += cssCode;
    } else if (document.getBoxObjectFor) {
      tag.innerHTML += cssCode; // FireFox broswer
    } else {
      tag.appendChild(document.createTextNode(cssCode))
    }
    this.asyncCallback(cb)
  }

  load(src, cb){
    if (!src) return;
    if (src.indexOf('http')==0 || src.indexOf('/')==0) {
      this.createRemoteCSS(src, cb)
    } else {
      this.createInnerCSS(src, cb)
    }
  }
}

module.exports = new CSSLoader()