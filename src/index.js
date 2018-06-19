/*
 * https://github.com/EvanLiu2968/web-inject
 * inject css/js, for client and server, also support inject css/js array or code
 */
const isClient = typeof window != 'undefined'

class Loader {
  constructor(options){
    this.options = options
    this.JSLoader = require('./JSLoader');
    this.CSSLoader = require('./CSSLoader');
    this.ImageLoader = require('./ImageLoader');
    this.AudioLoader = require('./AudioLoader');
    this.VideoLoader = require('./VideoLoader');
    this.LoadQueue = {
      js: []
    };
  }

  removeQueue(){
    this.LoadQueue = {}
  }

  create(options){
    return new Loader(options)
  }

  load(loader, src, cb){
    if(!isClient) return;

    if (typeof src == 'string') {
      loader.load(src, cb)
    }

    if (src && Array.isArray(src)) {
      if (src.length) {
        if (src.length == 1) {
          loader.load(src[0], cb)
        } else {
          loader.load(src[0], ()=>{
            src.shift()
            loader.load(src, cb)
          })
        }
      }
    }
    return this
  }

  js(src, cb){
    return this.load(this.JSLoader, src, cb)
  }

  css(src, cb){
    return this.load(this.CSSLoader, src, cb)
  }

  image(src, cb){
    return this.load(this.ImageLoader, src, cb)
  }

  audio(src, cb){
    return this.load(this.AudioLoader, src, cb)
  }

  video(src, cb){
    return this.load(this.VideoLoader, src, cb)
  }

  preload(options){
    if(!isClient) return;

    options = Object.assign({
      urlMap: function(url,type){
        return url
      },
      onLoading: function(progress){
        //
      },
      onComplete: function(){
        //
      }
    }, options)

    let loadType = ['js', 'css', 'image', 'audio', 'video'];
    loadType.forEach((item, i)=>{

      if(!options[item]) return;

      let url = options[item]
      if(Array.isArray(url)){
        url = options[item].map(u=>{
          return options.urlMap(u, item)
        })
      }else{
        url = options.urlMap(url, item)
      }

      this[item](url, options.onComplete)
    })
  }
}

module.exports = new Loader({
  urlMap: function(url, type){ return url },
  maxConnection: 4
})