const loader = require('chain-loader')

loader
.css('https://cdn.bootcss.com/bootstrap/4.1.0/css/bootstrap.min.css')
.js('https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js',function(){
  var $content = $(`
<div class="container">
  <h1>chain-loader</h1>
  <div class="alert alert-success" role="alert">jQuery and Bootstrap is injected!</div>
  <div style="margin-bottom:1em">
    <button class="btn btn-primary preload-images">Preload Images</button>
  </div>
  <div id="progress"></div>
  
</div>
  `)
  $('#app')
  .append($content)
  .on('click','.preload-images',function(){
    loader
    .preload({
      image: [
        '/public/images/horse.png',
        '/public/images/eagle.png'
      ],
      // audio: [
      //   'demo.mp4'
      // ],
      // video: [
      //   'demo.mp3'
      // ],
      urlMap: function(url, type){
        if(type == 'image'){
          return 'https://www.evanliu2968.com.cn' + url
        }
      },
      onLoading: function(progress){
        $("#progress").html(`
        <div class="progress">
          <div class="progress-bar" role="progressbar" aria-valuenow="${progress}" aria-valuemin="0" aria-valuemax="100" style="width: ${progress}%;">
            <span class="sr-only">${progress}% Complete</span>
          </div>
        </div>
        `)
      },
      onComplete: function(){
        alert('preload completed!')
      }
    })
  })
})