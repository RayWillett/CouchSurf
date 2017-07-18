var logging = require('./customLogging');
var video = require('./video');

function calculateOffsetSeekTime(seconds) {
  let time = video.getCurrentTime();
  time += convertToSeconds(0, seconds);
  return time;
}

function convertToSeconds(minutes, seconds) {
  let time = Number(seconds);
  time += (Number(minutes) * 60);
  if (!isNaN(time)) {
    return time;
  } else {
    throw error(logging.createMessage("The calculated time was not a number."));
  }
}

function timeSeekHandler(seekTime) {
  let seek = new CustomEvent('couchSurfSeek', createEventDetails(seekTime));
  document.dispatchEvent(seek);
}

function createEventDetails(seekTime) {
    return {
        detail: {
            seekTime: seekTime
        },
        bubbles: true,
        cancelable: false
    }
}

module.exports = {
    "calculateOffsetSeekTime": calculateOffsetSeekTime,
    "convertToSeconds": convertToSeconds,
    "timeSeekHandler": timeSeekHandler
} 