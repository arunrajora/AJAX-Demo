window.onload=function(){
	function fetch_random_number(){
		var xhr;
		//STEP 1:
		if(window.XMLHttpRequest){
			xhr=new XMLHttpRequest();
		}
		else{
			xhr=new ActiveXObject("Microsoft.XMLHTTP");
		}
		console.log(xhr);
		
		//STEP 2:
		//OPEN : method, url, async
		xhr.open("GET","/randomnumber",true);

		//STEP 3:
		//setRequestHeader: header, value
		xhr.setRequestHeader("authentication","123456");

		//STEP 4:
		xhr.onreadystatechange=function(){
			//ready state: 0 -request not initialized
			//1 server connection established
			//2 request received
			//3 processing request
			//4 request finished and response is ready


			console.log(this.readyState,this.status,this.statusText);
			if(this.readyState==4 && this.status==200){
				document.getElementById("number_holder").innerHTML=this.responseText%10;

				console.log(this.getAllResponseHeaders());
				//this.getresponseHeader("header-name")
			}
		}


		//STEP 5:
		xhr.send();
	}
	document.getElementById('regen_btn').onclick=function(){
		fetch_random_number()
	};
};