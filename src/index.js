const injectBuilder = reuqire('./injector')

//singleton models
var injectInstance = null; 

if(!injectInstance){
  injectInstance = new injectBuilder()
}

module.exports = injectInstance