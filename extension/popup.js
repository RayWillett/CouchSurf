const eventButtons = [
  {
    eventName: "netflix_video_play",
    buttonID: "play"
  },
  {
    eventName: "netflix_video_pause",
    buttonID: "pause"
  }
];

chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  for(let event of eventButtons) {
    document.getElementById(event.buttonID).addEventListener('click', () => { sendMessageFor(tabs, event.eventName) });
  }
});

function sendMessageFor(tabs, eventName) {
  chrome.tabs.sendMessage(tabs[0].id, {eventName: eventName}, function(response) {
    console.log(response.success);
  });
}