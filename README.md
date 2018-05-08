# injector

Inject js and css into document, or preload images/audios/videos resourcs.

and you can call it for chaining.

## Usage

### Install
```bash
npm install web-inject --save
```

### inject js or css tag
```javascript
const injector = require('web-inject')
injector
.js('https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js',function(){
  alert('jQuery is injected!')
})
.css('https://cdn.bootcss.com/bootstrap/4.1.0/css/bootstrap.min.css',function(){
  alert('Bootstrap is injected!')
})
```

### inject js or css into document
```javascript
const injector = require('web-inject')
const onComplete = function(){ alert('inject is completed!')}
injector
.js(`
[].forEach.call(document.querySelectorAll("*"), function(a) {
  a.style.outline = "1px solid #" + (~~(Math.random() * (1 << 24))).toString(16)
});
`)
.css(`
body{
  background: #20a0ff;
}
`)
```

### inject js or css list
```javascript
const injector = require('web-inject')
injector
.js([
  'https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js',
  'https://cdn.bootcss.com/lodash.js/4.17.5/lodash.min.js'
])
.css([
  'https://cdn.bootcss.com/bootstrap/4.1.0/css/bootstrap.min.css',
  'https://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css'
])
```

### preload images or audios or videos 
```javascript
const injector = require('web-inject')
injector
.preload({
  image: [
    'https://www.evanliu2968.com.cn/public/images/horse.png',
    'https://www.evanliu2968.com.cn/public/images/eagle.png'
  ],
  audio: [
    'demo.mp4'
  ],
  video: [
    'demo.mp3'
  ],
  urlMap: function(url, type){
    if(type == 'audio' || type == 'video'){
      return 'https://www.evanliu2968.com.cn' + url
    }
  },
  onProgress: function(progress){
    // progress is float number between 0 and 100
  },
  onError: function(error){
    // error occured
  },
  onComplete: function(){
    // a callback when all resourses are preloaded
  }
})
```

### create a new injector
```javascript
/*
 * the injector is new instance by create
 * then, It's the same usage as above.
 */
const injector = require('web-inject').create({
  urlMap: function(url, type){
    if(type == 'css' && (! /^(http|\/)/.test(url))){
      // innerCSS opacity mixins for IE
      var t = url.match(/opacity:(\d?\.\d+);/);
      if (t != null) url = url.replace(t[0], "filter:alpha(opacity=" + parseFloat(t[1]) * 100 + ")")
      url = url + "\n"; // format perform view
    }
    if(type == 'image' && (! /^(http|\/\/)/.test(url))){
      // base url
      url = 'https://www.evanliu2968.com.cn' + url
    }
    return url
  },
  maxConnection: 4 // max Simultaneous Browser Connections
})
```

## License

[MIT](LICENSE)