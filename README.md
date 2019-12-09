# Ethereum-Hardware-Wallet

Dependencies
-ehtereumjs-tx(browser build)
-Ethereum firefly
-Web3(browser build)

About Chrome App
  It use infura as an proxy server, so you need to fill the require http link of infura for respective ethereum network
  The first menu is choose your wallet page. It use chorme serial api to scan for any serial device and select one.
  The second is generate wallet account. It use Web3 library to generate public/private key pair and upload it to arduino
  The third is sign transaction. The data is collected from the page, create a transaction block, hash it and send it to arduino to sign. The arduino return the hesh's r,s value and the chrome app use it to create complete raw transaction block.
  With send button, the transaction block is broadcast to the selected ethereum network using web3's sendRawTransaction methode.
  
  Futher development
  -stlying and autofilling some field for non techanical user
  -optimizing the code
