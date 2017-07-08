chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  chrome.tabs.sendMessage(tabs[0].id, {eventName: "play"}, function(response) {
    console.log(response.success);
  });
});