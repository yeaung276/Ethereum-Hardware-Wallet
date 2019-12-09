var device_info;
var button1 = document.getElementById("chooseHW");
button1.addEventListener('click',function(){
    var dev = document.getElementById("devices");
    //var dev_index = dev.options[dev.selectedIndex].value;
    glob_device = device_info[dev.selectedIndex];  
  console.log(glob_device);
  chrome.storage.local.set({'device': glob_device});
  setTimeout(function(){window.close();},1000);
})



var button2 = document.getElementById('refrash');
  button2.addEventListener('click',function(){
    document.devList.device.options.length = 0;
    chrome.serial.getDevices(function(dev_info){
      device_info = dev_info;
		for(var i=0;i< (dev_info.length);i++){
          document.devList.device.options[i] = new Option("VID_"+dev_info[i].vendorId,i,true,false);
        }
    });
  })
  
  