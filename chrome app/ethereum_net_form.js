var button1 = document.getElementById('b1');
button1.addEventListener('click',function(){
  	var net1 = document.getElementById("1").value;
	var net2 = document.getElementById("2").value;
	var net3 = document.getElementById("3").value;
	var net4 = document.getElementById("4").value;
	var net5 = document.getElementById("5").value;
    
    chrome.storage.local.set({
      'net1' : net1,
      'net2' : net2,
      'net3' : net3,
      'net4' : net4,
      'net5' : net5
    });
  setTimeout(function(){
      chrome.app.window.create("window.html", {
    "bounds": {
        "width": 400,
        "height": 500
    }
    });
  },1000);
	
})