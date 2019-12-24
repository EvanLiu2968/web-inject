/**
 * web-inject
 */
'use strict'

function isServer() {
  return window === undefined
}

function appendToHead(el) {
  var head = document.head || document.getElementsByTagName('head')[0]
  head.appendChild(el)
}

function createRemoteCSS(src, cb) {
  var tag = document.createElement('link')
  tag.onload = tag.onreadystatechange = function() {
    if (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete') {
      cb && cb()
    }
  }

  if (src.lastIndexOf('.css') == -1) src += '.css'
  tag.setAttribute('rel', 'stylesheet')
  tag.setAttribute('href', src)
  appendToHead(tag)
}

function createInnerCSS(cssCode, cb) {
  var tag = document.createElement('style') // w3c
  tag.setAttribute('rel', 'stylesheet')
  tag.setAttribute('type', 'text/css')

  this.appendToHead(tag)

  var media = tag.getAttribute('media')
  if (media != null && !/screen/.test(media.toLowerCase())) {
    tag.setAttribute('media', 'screen')
  }
  if (tag.styleSheet) { // IE
    tag.styleSheet.cssText += cssCode
  } else if (document.getBoxObjectFor) {
    tag.innerHTML += cssCode // FireFox broswer
  } else {
    tag.appendChild(document.createTextNode(cssCode))
  }
  this.asyncCallback(cb)
}

function createRemoteJS(src, cb) {
  var tag = document.createElement('script')
  tag.setAttribute('type', 'text/javascript')
  tag.setAttribute('src', src)

  tag.onload = tag.onreadystatechange = function() {
    if (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete') {
      setTimeout(function() {
        cb()
      }, 100)
    }
  }
  appendToHead(tag)
}
function createInnerJS(jsCode, cb) {
  var tag = document.createElement('script')
  tag.setAttribute('type', 'text/javascript')

  tag.appendChild(document.createTextNode(jsCode))

  this.appendToHead(tag)

  this.asyncCallback(cb)
}

function createRemoteImage(src, cb) {
  var tag = document.createElement('img')
  tag.src = src
  if (tag.complete) {
    cb()
  } else {
    tag.onload = function() {
      cb()
    }
    tag.onerror = function(e) {
      cb()
    }
  }
}

function Injector() {
  this.finishedTask = []
}

Injector.prototype.create = function() {
  return new Injector()
}

Injector.prototype.js = function(src, cb) {
  if (this.finishedTask.find(function(item) {item.url == src})) {
    cb()
    return
  }
  var callback = function() {
    this.finishedTask.push({
      url: src,
      type: 'js',
      status: 'loaded'
    })
    cb()
  }
  if (!isServer()) {
    callback()
    return
  }
  if (window.document.querySelector('[src="' + src + '"]')) {
    callback()
    return
  }
  if (src.indexOf('http') == 0 || src.indexOf('/') == 0) {
    createRemoteJS(src, callback)
  } else {
    createInnerJS(src, callback)
  }
}

Injector.prototype.css = function(src, cb) {
  if (this.finishedTask.find(function(item) {item.url == src})) {
    cb()
    return
  }
  var callback = function() {
    this.finishedTask.push({
      url: src,
      type: 'css',
      status: 'loaded'
    })
    cb()
  }
  if (!isServer()) {
    callback()
    return
  }
  if (window.document.querySelector('[href="' + src + '"]')) {
    callback()
    return
  }
  if (src.indexOf('http') == 0 || src.indexOf('/') == 0) {
    createRemoteCSS(src, callback)
  } else {
    createInnerCSS(src, callback)
  }
}

Injector.prototype.image = function(src, cb) {
  if (!isServer()) return
  createRemoteImage(src, cb)
}
// 用于ssr时插入script和link标签
Injector.prototype.getTagMap = function(src, cb) {
  var map = {
    js: [],
    css: []
  }
  this.finishedTask.forEach(function(item){
    if (item.type === 'js') {
      map['js'].push('<script type="text/javascript" src="'+item.url+'"></script>')
    } else if (item.type === 'css') {
      map['css'].push('<link rel="stylesheet" href="'+item.url+'"></link>')
    }
  })
  return map
}

export default new Injector()
