window.onload=function(){

	function submitget(){
		var xhr;
		if(window.XMLHttpRequest){
			xhr=new XMLHttpRequest();
		}
		var name=document.getElementById("name").value;
		var age=document.getElementById("age").value;
		xhr.open("GET","/getsubmit?name="+name+"&age="+age.toString(),true);
		xhr.onreadystatechange=function(){
		if(this.readyState==4 && this.status==200){
				alert(this.responseText);
			}
		}
		xhr.send();
	}

	function submitpost(){
		var xhr;
		if(window.XMLHttpRequest){
			xhr=new XMLHttpRequest();
		}
		var name=document.getElementById("name").value;
		var age=document.getElementById("age").value;
		var params="name="+name+"&age="+age.toString();
		xhr.open("POST","/postsubmit",true);
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhr.setRequestHeader("Content-length", params.length);
		xhr.onreadystatechange=function(){
		if(this.readyState==4 && this.status==200){
				alert(this.responseText);
			}
		}

		//var formData = new FormData();
		//formData.append("name", name);
		//xhr.send(formData);

		xhr.send(params);	
	}

	function submitfile(){
		var files=document.querySelector('input[type="file"]').files;
		var formData = new FormData();
		for (var i = 0, file;i<1; ++i) {
			file = files[i];
    		formData.append("afile", file);
  		}
		var xhr = new XMLHttpRequest();
  		xhr.open('POST', "/filesubmit", true);
  		xhr.onreadystatechange=function(){
		if(this.readyState==4 && this.status==200){
				alert(this.responseText);
			}
		}
		xhr.send(formData);
	}

	function fetch_page(page_name){
		var xhr;
		if(window.XMLHttpRequest){
			xhr=new XMLHttpRequest();
		}
		xhr.open("GET","/"+page_name+".html",true);
		xhr.onreadystatechange=function(){
		if(this.readyState==4 && this.status==200){
				console.log(this.responseText);
				document.getElementById('page_container').innerHTML=this.responseText;
					if(page_name=="get"){						
						document.getElementById('getform').onsubmit = function() {
    						submitget();
    						return false;
						};
					}
					else if(page_name=="post"){
						document.getElementById('postform').onsubmit = function() {
    						submitpost();
    						return false;
						};
					}
					else if(page_name=="file"){
						document.getElementById('fileform').onsubmit = function() {
    						submitfile();
    						return false;
						};	
					}

			}
		}
		xhr.send();
	}
	document.getElementById('get').onclick=function(){
		fetch_page("get");
	};
	document.getElementById('post').onclick=function(){
		fetch_page("post");
	};
	document.getElementById('file').onclick=function(){
		fetch_page("file");
	};
};