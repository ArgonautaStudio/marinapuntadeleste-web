$(document).ready(function(){ 
   	var scuba = document.getElementById('scuba-1')
    function nextImg() { 
   	if (messages.length == 0) {
       messages = [ 
       "PERSONAL EN",
	    "INNOVACIÓN",
	    "NUESTROS",
	    "FILOSOFÍA XP",
	    "OPORTUNIDAD"
		].reverse(); 	  
    } 
    // change content of message, fade in, wait, fade out and continue with next message
    	scuba.html(messages.pop()).fadeIn(500).delay(7000).fadeOut(500, nextMsg); 
	};
	// list of messages to display 
	var messages = [ 
       "PERSONAL EN",
	    "INNOVACIÓN",
	    "NUESTROS",
	    "FILOSOFÍA XP",
	    "OPORTUNIDAD"
	].reverse(); 

	nextImg(); 


});