/*
 * https://github.com/EvanLiu2968/chain-loader
 * inject css/js, for client and server, also support inject css/js array or code
 */
const isClient = typeof window != 'undefined'

class Loader {
  constructor(){
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

  js(src, cb){
    if(!isClient) return;

    if (typeof src == 'string') {
      this.JSLoader.load(src, cb)
    }

    if (src && Array.isArray(src)) {
      if (src.length) {
        if (src.length == 1) {
          this.JSLoader.load(src[0], cb)
        } else {
          this.JSLoader.load(src[0], ()=>{
            src.shift()
            this.js(src, cb)
          })
        }
      }
    }
    return this
  }

  css(src, cb){
    if(!isClient) return;

    if (typeof src == 'string') {
      this.CSSLoader.load(src, cb)
    }

    if (src && Array.isArray(src)) {
      if (src.length) {
        if (src.length == 1) {
          this.CSSLoader.load(src[0], cb)
        } else {
          this.CSSLoader.load(src[0], ()=>{
            src.shift()
            this.css(src, cb)
          })
        }
      }
    }
    return this
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
    },options)
  }
}

module.exports = new Loader()