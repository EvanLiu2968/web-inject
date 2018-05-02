# injector

Inject js and css into document, or preload images/audios/videos resourcs.

## Usage

### Install
```bash
npm install injector --save
```

### inject js or css tag
```javascript
const injector = require('injector')
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
const injector = require('injector')
injector
.js(`
[].forEach.call(document.querySelectorAll("*"), function(a) {
  a.style.outline = "1px solid #" + (~~(Math.random() * (1 << 24))).toString(16)
});
`,function(){
  // callback
})
.css(`
body{
  background: #20a0ff;
}
`,function(){
  // callback
})
```

### inject js or css list
```javascript
const injector = require('injector')
injector
.js([
  'https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js',
  'https://cdn.bootcss.com/lodash.js/4.17.5/lodash.min.js'
],function(){
  // callback
})
.css([
  'https://cdn.bootcss.com/bootstrap/4.1.0/css/bootstrap.min.css',
  'https://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css'
],function(){
  // callback
})
```

### preload images or audios or videos 
```javascript
const injector = require('injector')
injector
.preload({
  images: [
    'https://www.evanliu2968.com.cn/public/images/horse.png'
  ],
  audio: [
    'demo.mp4'
  ],
  video: [
    'demo.mp3'
  ],
  onLoading: function(progress){
    //
  },
  onComplete: function(){
    // 
  }
})
```