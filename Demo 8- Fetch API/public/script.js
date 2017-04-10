window.onload=function(){
	


	function fetch_random_number(){
		


		fetch('/randomnumber')
  		.then(
    		function(response) {
      			if (response.status !== 200) {  
        			console.log(' Problem status code: ' +  response.status);  
		        	return;  
      			}
      			console.log(response);
    	  		response.text().then(function(data) {  
        			document.getElementById("number_holder").innerHTML=data;  
      			});  
    		}  
  		)
		.catch(function(err) {  
    		console.log('Fetch Error : ', err);  
  		});



	}



	document.getElementById('regen_btn').onclick=function(){
		fetch_random_number()
	};
};