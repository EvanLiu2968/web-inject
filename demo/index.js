const injector = require('chain-injector')

injector
.js('https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js',function(){
  alert('jQuery is injected!')
})
.css('https://cdn.bootcss.com/bootstrap/4.1.0/css/bootstrap.min.css',function(){
  alert('Bootstrap is injected!')
})