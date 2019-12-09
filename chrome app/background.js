chrome.app.runtime.onLaunched.addListener(function() {
    
    chrome.app.window.create("disp_devices.html",{
      "bounds": {
        "width": 200,
        "height": 250
      }
    });
  
    chrome.app.window.create("ethereum_net_form.html",{
      "bounds": {
        "width": 200,
        "height": 250
      }
    });
});
