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
request('http://www.statelocalgov.net/state-oh.cfm', function(error, response, body){
  if (!error && response.statusCode == 200) {
    
    // use the cheerio.load to accept the html-body and create a cheerio-obj stored as $ for jquery
    var $ = cheerio.load(body);
    // jquery time
    var $body = $('body');
    // Get EVERY list and attempt to figure out which one we need
    var $lists = $body.find('#content').find('ul');
    //console.log($lists);
    /*
     * unfortunately their website is unstructured and everything is jumbled
     * have to use relative/prev text blocks as markers for lists which is why
     * we have this bizarre iteration structure
     */
     var storeAllVillages = [];
     var storeAllCities = [];
    $lists.each(function(){
        // create a local ref
        var $list = $(this);

        // logic/regex processing magic 
        // we use the previous h3element to identify current list
        var prevh3Html = $list.prev().html();  
        var citiesMatch = /Cities/;
        var villageMatch = /Village/;
        
        //console.log(prevh3Html);
        var citiesMatch  = citiesMatch.exec(prevh3Html);
        var villagesMatch = villageMatch.exec(prevh3Html);

        
        var cityObj = {};
        if(citiesMatch){
            $list.each(function(){
              var $city = $(this).find('a');
              $city.each(function(){
                //cityObj = $(this).html();
                cityObj = _processElement($(this));
                storeAllCities.push(cityObj);
                
              });
           });
        }
	
        
        var villageObj = {};
        //village regex matches, pasing villages
        if(villagesMatch){
          $list.each(function(){
            var $village = $(this).find('a');
            $village.each(function(){
              //create just an array of the village name
              //villageObj = $(this).html();
              villageObj = _processElement($(this));
              storeAllVillages.push(villageObj);
            });
          });	
        }
    });

    console.log('-- Cities --');
    console.log(storeAllCities);
    console.log('-- Villages --');
    console.log(storeAllVillages);
  } //< end RequestReponse validation
});
