const md5 = require('blueimp-md5')
const Loader = require('./BaseLoader')

class CSSLoader extends Loader {
  constructor(){
    super()
  }

  createRemoteCSS(id, src, cb){
    if(document.getElementById(id)) return;

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
    tag.setAttribute("id", id);

    this.appendToHead(tag)
  }

  createInnerCSS(id, cssCode, cb){
    if(document.getElementById(id)) return;

    var tag = document.createElement('style'); // w3c
    tag.setAttribute("rel", "stylesheet");
    tag.setAttribute("type", "text/css");
    tag.setAttribute("id", id);

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
    if (src) {
      var $id = md5(src).slice(22)
      var $el = document.getElementById($id)
      if ($el) {
        this.asyncCallback(cb)
      } else {
        if (src.indexOf('http')==0 || src.indexOf('/')==0) {
          this.createRemoteCSS($id, src, cb)
        } else {
          this.createInnerCSS($id, src, cb)
        }
      }
    } else {
      this.asyncCallback(cb)
    }
  }
}

module.exports = new CSSLoader()