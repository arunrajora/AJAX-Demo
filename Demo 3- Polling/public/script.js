window.onload=function(){

	var timer=[];

	function start_short_poll(){
		timer.push(setTimeout(function(){
			short_term_polling();
		},2000));
	}

	function short_term_polling(){
		var xhr;
		xhr=new XMLHttpRequest();
		xhr.open("GET","/spoll",true);
		xhr.onreadystatechange=function(){
			if(this.readyState==4 && this.status==200 && document.getElementById('temp1')!=null){
				document.getElementById('temp1').innerHTML=this.responseText;
				document.getElementById('white1').style.height=(200-this.responseText).toString()+"px";
				console.log(this.responseText,timer);
			}
			if(this.readyState==4){
				if(timer.length!=0){
					console.log("answer",timer);
				timer.shift();
				}
				start_short_poll();
			}
		}
		xhr.send();
	}

	function start_long_poll(){
		timer.push(setTimeout(function(){
			long_term_polling();
		},2000));
	}

	function long_term_polling(){
		var xhr;
		xhr=new XMLHttpRequest();
		xhr.open("GET","/lpoll",true);
		xhr.onreadystatechange=function(){
			if(this.readyState==4 && this.status==200 && document.getElementById('temp2')!=null){
				document.getElementById('temp2').innerHTML=this.responseText;
				document.getElementById('white2').style.height=(200-this.responseText).toString()+"px";
				console.log(this.responseText);
			}
			if(this.readyState==4){
				if(timer.length!=0)
				timer.shift();
				start_long_poll();
			}
		}
		xhr.send();
	}


	function fetch_page(page_name){
		var xhr;
		for(var i = 0; i < timer.length; i++) {
    		clearTimeout(timer[i]);
    		timer.shift();
		}
		console.log("clearing",timer);
		xhr=new XMLHttpRequest();
		xhr.open("GET","/"+page_name+".html",true);
		xhr.onreadystatechange=function(){
		if(this.readyState==4 && this.status==200){
				console.log(this.responseText);
				document.getElementById('page_container').innerHTML=this.responseText;
					if(page_name=="short"){
						start_short_poll();
					}
					else if(page_name=="long"){
						start_long_poll();
					}
					else if(page_name=="wshort"){
						start_waited_short_poll();
					}

			}
		}
		xhr.send();
	}
	document.getElementById('short').onclick=function(){
		fetch_page("short");
	};
	document.getElementById('long').onclick=function(){
		fetch_page("long");
	};
};