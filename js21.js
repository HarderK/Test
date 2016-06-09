var data = new FormData();
//data.append("name","Nicholas");

var data1 = new FormData(document.forms[0]);

var xhr = createXHR();
xhr.open("get","text.php",true);
xhr.overrideMimeType("text/xml");
xhr.send(null);

xhr.onprogress = function(event){
	var divStatus = document.getElementById("status");

	if(event.lengthComputable){
		divStatus.innerHTML = "Received " + event.position + " of" + event.totalSize + " bytes";
	}
}