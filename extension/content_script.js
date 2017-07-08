chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log("Message received: ", request);
    var eventName = request.eventName;
    if (events[eventName]) {
        document.dispatchEvent(events[eventName]);
        sendResponse({
            success: true
        });
    }
  });

document.addEventListener('play', function (e) {
    console.log('press the play button');
  }, false);
document.addEventListener('pause', function (e) {
    console.log('press the pause button');
  }, false);

var events = {
    "play": new Event('play'),
    "pause": new Event('pause')
}