var Browser = require('zombie');

Browser.debug=true;
Browser.waitFor=5000;
var browser = new Browser();

browser.visit('http://www.statelocalgov.net/state-oh.cfm', function(err, browser){
    if(browser.error){
    	console.log('err',browser.error);
    }
    else {
		console.log(browser.document.query("#container"));
	}
	
		
});
 
