(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var time = require('./time');
var video = require('./video');

let commands = {
    'pause video': function () {
        video.pause();
    },
    'play video': function () {
        video.play();
    },
    'go to :minutes (minutes) and :seconds (seconds)': function (minutes, seconds) {
        if (isNaN(minutes) || isNaN(seconds)) {
            return;
        } else {
            const seekTime = time.convertToSeconds(minutes, seconds);
            time.timeSeekHandler(seekTime);
        }
    },
    'go to (the) beginning': function() {
        time.timeSeekHandler(0);
    },
    'go back :seconds (seconds)': function(seconds) {
        if (isNaN(seconds)) {
            return;
        } else {
            const seekTime = time.calculateOffsetSeekTime(-seconds);
            time.timeSeekHandler(seekTime);
        }
    },
    'go forward :seconds (seconds)': function(seconds) {
        if (isNaN(seconds)) {
            return;
        } else {
            const seekTime = time.calculateOffsetSeekTime(seconds);
            time.timeSeekHandler(seekTime);
        }
    }
}

module.exports = {
    "init": function() {
        annyang.addCommands(commands);
    }
};
},{"./time":5,"./video":6}],2:[function(require,module,exports){
module.exports = {
    "createMessage": function(message) {
        return {
            "error": message,
            "arguments": arguments,
            "date": Date()
        };
    }
}
},{}],3:[function(require,module,exports){
var logging = require('./customLogging');

function logAnnyangListeningState() {
    window.setTimeout(() => {
        if (annyang.isListening()) {
        console.log('Annyang is listening!');
        } else {
        console.log('Annyang is _NOT_ listening!');
        }
    }, 200);
}

function assertAnnyangExists() {
    if (typeof annyang !== "undefined") {
        console.log("Annyang exists");
    } else {
        throw(error(logging.createMessage("Annyang does not exist on the page.")));
    }
}

function initCallbacks() {
    annyang.addCallback('result', function(results) {
        console.log(results);
    });
}

module.exports = {
    "init": function() {
        assertAnnyangExists();
        logAnnyangListeningState();
        initCallbacks();
    }
}
},{"./customLogging":2}],4:[function(require,module,exports){
//Since these event listeners cannot interact with the content script, we need to duplicate a lot of content here
//Consider breaking events out into something like injected_script.js to go along with content_script.js


function createVideoSeekHandler() {
    var handler = "";
    if(window.origin === "https://www.netflix.com") {
        handler = createNetflixSeekHandler();
    } else {
        handler = createHTML5VideoSeekHandler();
    }
    return handler;
}

function createNetflixSeekHandler() {
    let addEventListener = function() {
        document.addEventListener('couchSurfSeek', function netflixSeekHandler(event) {
            console.log('netflix');
            var seekTime = event.detail.seekTime;
            netflix.cadmium.UiEvents.events.resize[1].scope.events.dragend[1].handler(null, {value: seekTime, pointerEventData: {}});
        });
    }
    return addEventListener.toString();
}

function createHTML5VideoSeekHandler() {
    let addEventListener = function() {
        document.addEventListener('couchSurfSeek', function HTML5VideoSeekHandler(event) {
            console.log('general video');
            var seekTime = event.detail.seekTime;
            document.querySelector('video').currentTime = seekTime;
        });
    }
    return addEventListener.toString();
}

function attachEventsToDOM(events) {
    let src = document.createElement('script');
    for(index in events) {
        events[index] = '(' + events[index].toString() + ')()';
    }
    src.innerHTML = events.join(';\n');
    document.head.appendChild(src);
}

module.exports = {
    "init": function() {
        var events = [];
        events.push(createVideoSeekHandler())
        attachEventsToDOM(events);
    }
}
},{}],5:[function(require,module,exports){
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
},{"./customLogging":2,"./video":6}],6:[function(require,module,exports){
function getVideoTime(video) {
    return video.currentTime
}

function getVideoElement() {
    return document.querySelector('video');
}

function setVideoTime(seekTime) {
    getVideoElement().currentTime = seekTime;
}

module.exports = {
    getCurrentTime: function() {
        return getVideoTime(getVideoElement());
    },
    pause: function() {
        getVideoElement().pause()
    },
    play: function() {
        getVideoElement().play();
    },
    seek: function(seekTime) {
        setVideoTime(seekTime);
    }
}
},{}],7:[function(require,module,exports){
var content = require('./content_script');
content(debug = true);
},{"./content_script":8}],8:[function(require,module,exports){
var commands = require('./client/commands');
var events = require('./client/events');
var debugging = require('./client/debug');

module.exports = function(DEBUG) {
    events.init();
    commands.init();
    annyang.start();
    if(DEBUG) {
      debugging.init();
    }
}
},{"./client/commands":1,"./client/debug":3,"./client/events":4}]},{},[7]);
