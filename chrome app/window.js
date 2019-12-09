


	var device;
	var selectedNet;
document.addEventListener('DOMContentLoaded',function(){
  
var sel_net = document.getElementById("nets");
  sel_net.addEventListener('change',function(){
    console.log('it is ok')
  switch(sel_net.selectedIndex){
  case 0 :  chrome.storage.local.get('net1',function(result){
    selectedNet = result.net1;
    chrome.storage.local.set({"selectedNet" : selectedNet});
    var web3 = new Web3(Web3.providers.WebsocketProvider(selectedNet));
  });
  		break;
  case 1 :  chrome.storage.local.get('net2',function(result){
    selectedNet = result.net2;
    chrome.storage.local.set({"selectedNet" : selectedNet});
    var web3 = new Web3(Web3.providers.WebsocketProvider(selectedNet));
  });
  		break;
  case 2 :  chrome.storage.local.get('net3',function(result){
    selectedNet = result.net3;
    chrome.storage.local.set({"selectedNet" : selectedNet});
    var web3 = new Web3(Web3.providers.WebsocketProvider(selectedNet));
  });
  		break;
  case 3 :  chrome.storage.local.get('net4',function(result){
    selectedNet = result.net4;
    chrome.storage.local.set({"selectedNet" : selectedNet});
    var web3 = new Web3(Web3.providers.WebsocketProvider(selectedNet));
  });
  		break;
  case 4 :  chrome.storage.local.get('net5',function(result){
    selectedNet = result.net5;
    chrome.storage.local.set({"selectedNet" : selectedNet});
    var web3 = new Web3(Web3.providers.WebsocketProvider(selectedNet));  
  });
  		break;
  default : 
  		break;
  }

  })
  
  var button1 = document.getElementById('sendTransaction');
  button1.addEventListener('click',function(){
    chrome.app.window.create("transaction_page.html",{
      "bounds": {
        "width": 400,
        "height": 500
      }
    })
  });
 
  var button2 = document.getElementById("chooseHW");
  button2.addEventListener('click',function(){
    chrome.app.window.create("disp_devices.html",{
      "bounds": {
        "width": 200,
        "height": 250
      }
    })
  });
  
  var button3 = document.getElementById("createAccount");
  button3.addEventListener('click',function(){
    var web3 = new Web3(Web3.givenProvider);
    var account = web3.eth.accounts.create();
    
    document.getElementById('disp1').innerHTML = "Private Key : " + account.privateKey;
    document.getElementById('disp2').innerHTML  = "Account Address : " + account.address;
    
    var priv_k = web3.utils.hexToBytes(account.privateKey);
    chrome.storage.local.get('device',function(result){
  device = result.device;
});
    
    chrome.serial.connect(device.path,{'bufferSize' : 4},function(connectionInfo){
      setTimeout(function(){
        chrome.serial.send(connectionInfo.connectionId,new Uint8Array([2]).buffer,function(){})
        setTimeout(function(){
          chrome.serial.send(connectionInfo.connectionId,new Uint8Array(priv_k).buffer,function(){
            chrome.serial.disconnect(connectionInfo.connectionId,function(){});
          })},1000);
        },4000)
      });
      
    })
  
  })

