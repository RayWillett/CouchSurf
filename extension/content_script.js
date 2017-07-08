chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log("Received request: ", request);
    let eventName = request.eventName;
    if (events[eventName]) {
      document.dispatchEvent(events[eventName]);
      sendResponse(createResponseSuccessMessage());
    } else {
      alert("That action is not supported");
      sendResponse(createResponseFailureMessage());
    }
  });


document.addEventListener('play', function (e) {
    console.log('pressed the play button');
  }, false);
document.addEventListener('pause', function (e) {
    console.log('pressed the pause button');
  }, false);

var events = {
    "play": new Event('netflix_video_play'),
    "pause": new Event('netflix_video_pause'),
    "seek": new Event('netflix_video_seek')
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