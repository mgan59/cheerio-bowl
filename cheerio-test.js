var cheerio = require('cheerio');
var request = require('request');


// obj data return wrapper
var _processElement = function($this){
  var obj = {
        name:$this.html(),
        url:$this.attr('href')
      };
  return obj;
};

/*
 *  Request is an awesome module by Mikeal Rogers-> https://github.com/mikeal
 */
request('http://www.google.com', function(error, response, body){
  if (!error && response.statusCode == 200) {
    
    // use the cheerio.load to accept the html-body and create a cheerio-obj stored as $ for jquery
    var $ = cheerio.load(body);
    // jquery time
    var $body = $('body');
    
    var $logoImg = $body.find('#hplogo');

    console.log('Reading the alt attribute from google.com logo image -> ',$logoImg.attr('alt'));


  } //< end RequestReponse validation
});
