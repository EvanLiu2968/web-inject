const md5 = require('blueimp-md5')
const Loader = require('./BaseLoader')

class JSLoader extends Loader {
  constructor(){
    super()
  }

  createRemoteJS(id, src, cb){
    if(document.getElementById(id)) return;

    const self = this
    var tag = document.createElement('script');
    tag.setAttribute("type", 'text/javascript');
    tag.setAttribute("id", id);
    tag.setAttribute("src", src);
  
    tag.onload = tag.onreadystatechange = function(){
      if( ! this.readyState || this.readyState=='loaded' || this.readyState=='complete' ){
        self.asyncCallback(cb)
      }
    }
    
    this.appendToHead(tag)
  }
  
  createInnerJS(id, jsCode, cb){
    if(document.getElementById(id)) return;

    var tag = document.createElement('script');
    tag.setAttribute("type", 'text/javascript');
    tag.setAttribute("id", id);
  
    tag.appendChild(document.createTextNode(jsCode))
  
    this.appendToHead(tag)
  
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
          this.createRemoteJS($id, src, cb)
        } else {
          this.createInnerJS($id, src, cb)
        }
      }
    } else {
      this.asyncCallback(cb)
    }
  }
}

module.exports = new JSLoader()