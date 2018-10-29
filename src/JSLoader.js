const Loader = require('./BaseLoader')

class JSLoader extends Loader {
  constructor(){
    super()
  }

  createRemoteJS(src, cb){
    const self = this
    var tag = document.createElement('script');
    tag.setAttribute("type", 'text/javascript');
    tag.setAttribute("src", src);
  
    tag.onload = tag.onreadystatechange = function(){
      if( ! this.readyState || this.readyState=='loaded' || this.readyState=='complete' ){
        self.asyncCallback(cb)
      }
    }
    
    this.appendToHead(tag)
  }
  
  createInnerJS(jsCode, cb){
    var tag = document.createElement('script');
    tag.setAttribute("type", 'text/javascript');
  
    tag.appendChild(document.createTextNode(jsCode))
  
    this.appendToHead(tag)
  
    this.asyncCallback(cb)
  }

  load(src, cb){
    if (!src) return;
    if (src.indexOf('http')==0 || src.indexOf('/')==0) {
      this.createRemoteJS(src, cb)
    } else {
      this.createInnerJS(src, cb)
    }
  }
}

module.exports = new JSLoader()