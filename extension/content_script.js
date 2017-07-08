chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log("Received request: ", request);
    let eventName = request.eventName;
    if (events[eventName]) {
      sendResponse(createResponseSuccessMessage());
    } else {
      sendResponse(createResponseFailureMessage());
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

function createResponseSuccessMessage() {
  return {
    success: true
  };
}

function createResponseFailureMessage() {
  return {
    success: false
  };
}