const injector = require('chain-injector')

injector
.js('https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js',function(){
  console.log('jQuery is injected!')
  $content = $(`
  <div></div>
  `)
  $('#app')
  .append($content)
  .on('click','.preload-images',function(){
    injector
    .preload({
      image: [
        'https://www.evanliu2968.com.cn/public/images/horse.png',
        'https://www.evanliu2968.com.cn/public/images/eagle.png'
      ],
      // audio: [
      //   'demo.mp4'
      // ],
      // video: [
      //   'demo.mp3'
      // ],
      onLoading: function(progress){
        console.log(progress)
        // progress is float number between 0 and 100
      },
      onComplete: function(){
        // a callback when all resourses are preloaded
      }
    })
  })
})
.css('https://cdn.bootcss.com/bootstrap/4.1.0/css/bootstrap.min.css',function(){
  console.log('Bootstrap is injected!')
})