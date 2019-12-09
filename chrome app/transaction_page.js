
/*  var connectionId;
  var device;
  var serializeTransaction;*/
var device;
var connectionId;
var RawTransaction;
var haha;
var selectedNet;

chrome.storage.local.get('selectedNet',function(info){
  selectedNet = info.selectedNet;
});

chrome.storage.local.get('device',function(result){
  device = result.device;
});
chrome.storage.local.get('connectionId',function(result){
  connectionId = result.connectionId;
})
console.log("the function is working");



//buttons even handler
document.addEventListener('DOMContentLoaded',function(){
  var button1 = document.getElementById("sign");
  var button2 = document.getElementById("sendSignedTransaction");
  button1.addEventListener('click',function(){
    console.log("clicked1");
    hd_sign();
  });
  button2.addEventListener('click',function(){
    sendTransaction();
    console.log("clicked2");
  })
})

function hd_sign(){
  
var nonce = document.getElementById("nonce").value;
var gasPrice = document.getElementById("gasPrice").value;
var gasLimit = document.getElementById("gasLimit").value;
var to = document.getElementById("to").value;
var value = document.getElementById("value").value;
var Data = document.getElementById("data").value;

let txParams = {
    nonce:    nonce,
    gasPrice: gasPrice, 
    gasLimit: gasLimit,
    to:       to, 
    value:    value, 
    data:     Data
  }//TODO - include input error handling 

  //create transaction block
  var Tx = new ethereumjs.Tx(txParams);
  
  //send transaction hash to hd wallet
  var u_t_h = new Uint8Array(32);
  u_t_h = Tx.hash(false);//transaction hash referenced to ethereumjs-tx
  console.log(u_t_h);
  
  //open serial com and send data

  chrome.serial.connect(device.path,{'bufferSize' : 4},function(connectionInfo){
    connectionId = connectionInfo.connectionId;
    
         //receive signature
    var data = new Uint8Array(64);
    var offset = 0;
chrome.serial.onReceive.addListener(function(info){
  console.log("receive")
  if(info.connectionId == connectionId){
    var rec = new Uint8Array(info.data);
    console.log(rec);
   data.set(rec,offset);
   offset+=rec.length;
   console.log(offset);
    
       if(offset == 64){
       console.log(data);
  chrome.serial.disconnect(connectionId,function(info){
    
  })
  chrome.serial.onReceive.removeListener();
    
    
    //divide data to r,v,s values and change to hex string
/*         if (Tx._implementsEIP155()) {
      sig.v += Tx.getChainId() * 2 + 8
    }*/
  var r = hex_2_string(data.slice(0,32));
         console.log(r);
  var s = hex_2_string(data.slice(32,64));
         console.log(s);
  var v = '0x1c';
  	//To Do
  //create complete transaction block
  let txParams_1 = {
    nonce:    nonce,
    gasPrice: gasPrice, 
    gasLimit: gasLimit,
    to:       to, 
    value:    value, 
    data:     Data,
    v:        v,
    r:		  r,
    s:        s
  }
  var Tx_1 = new ethereumjs.Tx(txParams_1);
  //chack for signature validation
         console.log(Tx_1.verifySignature());
         haha = Tx_1;
  if(Tx_1.verifySignature)
    	 RawTransaction = Tx_1.serialize();
    } 
  }
  });
    setTimeout(function(){
      chrome.serial.send(connectionId,new Uint8Array([1]).buffer,function(sendInfo){});
      setTimeout(function(){
        chrome.serial.send(connectionId,new Uint8Array(u_t_h).buffer,function(sendInfo){
         console.log(sendInfo);
      })},1000)},3000);//wait for adduino for ready to receive
     
});
  

}

function sendTransaction(){
  var web3 = new Web3(Web3.givenProvider);
  web3.setProvider(new web3.providers.HttpProvider(selectedNet));
  web3.eth.sendSignedTransaction(hex_2_string(RawTransaction),function(info){console.log("send")});
  
  
  
}
function hex_2_string(Hex){
  var Hex_str = '0x';
  for(var i = 0;i < Hex.length;i++){
    if(Hex[i] < 16){Hex_str += '0';}
    Hex_str += Hex[i].toString(16);
  }
  return Hex_str;
}