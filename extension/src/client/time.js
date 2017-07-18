var createLoggingObject = require('./customLogging');

function calculateOffsetSeekTime(seconds) {
  let time = document.querySelector('video').currentTime;
  time += convertToSeconds(0, seconds);
  return time;
}

function convertToSeconds(minutes, seconds) {
  let time = Number(seconds);
  time += (Number(minutes) * 60);
  if (!isNaN(time)) {
    return time;
  } else {
    throw error(createLoggingObject("The calculated time was not a number."));
  }
}

function timeSeekHandler(seekTime) {
  let seek = new CustomEvent('couchSurfSeek', {
    detail: {
      seekTime: seekTime
    },
      bubbles: true,
      cancelable: false
    });
  document.dispatchEvent(seek);
}  

module.exports = {
    "calculateOffsetSeekTime": calculateOffsetSeekTime,
    "convertToSeconds": convertToSeconds,
    "timeSeekHandler": timeSeekHandler
} 