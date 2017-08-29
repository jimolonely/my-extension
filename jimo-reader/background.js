chrome.app.runtime.onLaunched.addListener(function(launchData) {
  chrome.app.window.create('index.html', {id:"logWin", innerBounds: {width: 1300, height: 900}}, function(win) {
    win.contentWindow.launchData = launchData;
  });
});
