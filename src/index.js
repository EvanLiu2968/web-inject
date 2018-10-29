/*
 * https://github.com/EvanLiu2968/web-inject
 * inject css/js, for client and server, also support inject css/js array or code
 */

const isClient = typeof window != 'undefined'

const finishedTask = {}

class Loader {
  constructor(options){
    this.options = Object.assign({
      serial: false, // 是否串行加载
      urlFormat: function(url, type){ return url },
      onComplete: function(){},
      maxConnection: 4
    }, options)
    this.Loader = {
      'js': require('./JSLoader'),
      'css': require('./CSSLoader'),
      'image': require('./ImageLoader'),
      'audio': require('./AudioLoader'),
      'video': require('./VideoLoader'),
    };
    this.taskCount = 0;
  }

  getFinishedTask() {
    return finishedTask
  }

  isFinishedTask(url) {
    return !!finishedTask[url]
  }

  addFinishedTask(url) {
    if(!this.isFinishedTask(url)){
      finishedTask[url] = {
        state: 'finished'
      }
    }
  }

  startQueue(queue, options){
    // 队列任务串行加载
    if(options.serial) {
      options.currentTask = options.currentTask || 0
      if(options.currentTask < queue.length){
        let task = queue[options.currentTask]
        const callback = ()=>{
          options.currentTask++;
          if(task.callback) {
            task.callback();
            queue = []
            return
          }
          this.startQueue(queue, options)
        }
        if(this.isFinishedTask(task.url)){
          callback()
        } else {
          let loader = this.Loader[task.type]
          loader.load(task.url, () => {
            this.addFinishedTask(task.url)
            callback()
          })
        }
      }
      return
    }
    // 队列任务并行加载
    for(let i = 0; i < queue.length; i++){
      if(this.taskCount < options.maxConnection){
        if(!queue[i].state){
          let task = queue[i]
          const callback = ()=>{
            this.taskCount--;
            queue[i].state = 'finished'
            if(task.callback) {
              task.callback();
              queue = []
              return
            }
            this.startQueue(queue, options)
          }
          this.taskCount++;
          queue[i].state = 'loading'
          if(this.isFinishedTask(task.url)){
            callback()
          } else {
            let loader = this.Loader[task.type]
            loader.load(task.url, () => {
              this.addFinishedTask(task.url)
              callback()
            })
          }
        }
      }
    }
  }

  create(options){
    return new Loader(options)
  }

  preload(options){
    if(!isClient) return;

    options = Object.assign({}, this.options, options)

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
    this.startQueue(queue, options)
    return this
  }

  load(type, src, cb){
    let options = {
      onComplete: cb
    }
    if(type === 'js') {
      options.serial = true
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

module.exports = new Loader()