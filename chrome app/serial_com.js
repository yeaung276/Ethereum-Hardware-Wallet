var connectionOption = {
  'bufferSize' : 64
};

//code for chacking serial devices connected to the computer
//function listDevices(){
//  chrome.serial.getDeveices(function(dev_info){
  
  
//  })};
//code for opening serial connection to the selected device
function portOpen(port){
  chrome.serial.connect(port,connectionOption,function(connectionInfo){
  	glob_connectionId = connectionInfo.connectionId;
    chrome.storage.local.set({'connectionId' : glob_connectionId});
})};
//code for closing serial connection
function portClose(connectionID){
  chrome.serial.disconnect(connectionID,function(result){
    
  })
};
//code for sending data to the device
function sendData(connectionId,data){
  chrome.serial.send(connectionId,data,function(sendInfo){
    
  })
};

