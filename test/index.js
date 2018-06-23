const webInject = require('web-inject')

webInject
.css('https://cdn.bootcss.com/bootstrap/4.1.0/css/bootstrap.min.css')
.css(
`
  h1 {
    margin: 20px 0
  }
`
)
.js('https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js',function(){
  var $content = $(
`
  <div class="container">
    <h1>web-inject</h1>
    <div class="alert alert-success" role="alert">jQuery and Bootstrap is injected success!</div>
    <div style="margin-bottom:1em">
      <button class="btn btn-primary preload-images">Preload Images</button>
    </div>
    <div id="progress"></div>
    <div id="preload"></div>
  </div>
`
)
  $('#app')
  .append($content)
  .on('click','.preload-images',function(){
    webInject
    .js(
      `
        [].forEach.call(document.querySelectorAll("*"), function(a) {
          a.style.outline = "1px solid #" + (~~(Math.random() * (1 << 24))).toString(16)
        });
      `)
    .preload({
      image: [
        '/public/images/horse.png',
        '/public/images/eagle.png'
      ],
      js: [
        'https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js',
        'https://cdn.bootcss.com/lodash.js/4.17.5/lodash.min.js'
      ],
      css: [
        'https://cdn.bootcss.com/bootstrap/4.1.0/css/bootstrap.min.css',
        'https://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css'
      ],
      // audio: [
      //   '/static/images/music/%E5%AE%8B%E5%86%AC%E9%87%8E%20-%20%E8%8E%89%E8%8E%89%E5%AE%89.mp3'
      // ],
      // video: [
      //   'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4'
      // ],
      urlFormat: function(url, type){
        if(type == 'image'){
          return 'https://www.evanliu2968.com.cn' + url
        } else {
          return url
        }
      },
      onComplete: function(){
        alert('preload completed!')
        $("#preload").html(
          `
          <img src="https://www.evanliu2968.com.cn/public/images/horse.png" />
          <img src="https://www.evanliu2968.com.cn/public/images/eagle.png" />
          `
        )
      }
    })
  })
})