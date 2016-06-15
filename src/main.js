const Cf = require('./lib/base.js');


var poll = require('./commonFunctions.js');

console.log(new Confirmit({
  properties:{
    hello:{type:String, value:'world'}
  }
}));
