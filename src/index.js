/*
 * https://github.com/EvanLiu2968/web-inject
 * inject css/js, for client and server, also support inject css/js array or code
 */
const extend = require('./extend')
const isClient = typeof window != 'undefined'

class Loader {
  constructor(options){
    this.options = options
    this.Loader = {
      'js': require('./JSLoader'),
      'css': require('./CSSLoader'),
      'image': require('./ImageLoader'),
      'audio': require('./AudioLoader'),
      'video': require('./VideoLoader'),
    };
    this.taskCount = 0;
  }

  startQueue(queue){
    for(let i =0; i<queue.length; i++){
      if(this.taskCount < this.options.maxConnection){
        if(!queue[i].state){
          this.taskCount++;
          queue[i].state = 'loading';
          let loader = this.Loader[queue[i].type]
          loader.load(queue[i].url, ()=>{
            this.taskCount--;
            queue[i].state = 'finished';
            if(queue[i].callback) {
              queue[i].callback();
              queue = []
            }
            this.startQueue(queue)
          })
        }
      }
    }
  }

  create(options){
    return new Loader(options)
  }

  preload(options){
    if(!isClient) return;

    options = extend({
      urlFormat: this.options.urlFormat,
      onComplete: this.options.onComplete,
    }, options)

    let loadType = ['js', 'css', 'image', 'audio', 'video'];
    let queue = [];
    loadType.forEach((item, i)=>{

      if(!options[item]) return;

      if(Array.isArray(options[item])){
        options[item].map(u=>{
          queue.push({
            url: options.urlFormat(u, item),
            type: item
          })
        })
      }else{
        queue.push({
          url: options.urlFormat(options[item], item),
          type: item
        })
      }
    })
    queue[queue.length-1].callback = options.onComplete;
    this.startQueue(queue)
    return this
  }

  load(type, src, cb){
    let options = {
      onComplete: cb
    }
    options[type] = src;
    return this.preload(options)
  }

  js(src, cb){
    return this.load('js', src, cb)
  }

  css(src, cb){
    return this.load('css', src, cb)
  }

  image(src, cb){
    return this.load('image', src, cb)
  }

  audio(src, cb){
    return this.load('audio', src, cb)
  }

  video(src, cb){
    return this.load('video', src, cb)
  }
}

module.exports = new Loader({
  urlFormat: function(url, type){ return url },
  onComplete: function(){},
  maxConnection: 4
})