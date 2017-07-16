(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var content = require('./content_script');
content(debug = true);
},{"./content_script":2}],2:[function(require,module,exports){
module.exports = function couchSurf(DEBUG) {
  function initDebugging() {
    if (DEBUG) {
      assertAnnyangExists();
      logAnnyangListeningState();
      initCallbacks();
    }
  }

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
      throw(error(createLoggingObject("Annyang does not exist on the page.")));
    }
  }

  function initCallbacks() {
    annyang.addCallback('result', function(results) {
      console.log(results);
    });
  } 

  function timeSeekHandler(seekTime) {
    let seek = new CustomEvent('netflixSeek', {
      detail: {
        seekTime: seekTime
      },
      bubbles: true,
      cancelable: false
    });
    document.dispatchEvent(seek);
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

  function calculateOffsetSeekTime(seconds) {
    let time = document.querySelector('video').currentTime;
    time += convertToSeconds(0, seconds);
    return time;
  }

  function createLoggingObject(message) {
    return {
        "error": message,
        "arguments": arguments,
        "date": Date()
      };
  }

  function initCommands() {
    let commands = {
      'pause netflix': function () {
        document.querySelector('video').pause();
      },
      'play netflix': function () {
        document.querySelector('video').play();
      },
      'go to :minutes (minutes) and :seconds (seconds)': function (minutes, seconds) {
        if (isNaN(minutes) || isNaN(seconds)) {
          return;
        } else {
          const seekTime = convertToSeconds(minutes, seconds);
          timeSeekHandler(seekTime);
        }
      },
      'go to (the) beginning': function() {
        timeSeekHandler(0);
      },
      'go back :seconds (seconds)': function(seconds) {
        if (isNaN(seconds)) {
          return;
        } else {
          const seekTime = calculateOffsetSeekTime(-seconds);
          timeSeekHandler(seekTime);
        }
      },
      'go forward :seconds (seconds)': function(seconds) {
        if (isNaN(seconds)) {
          return;
        } else {
          const seekTime = calculateOffsetSeekTime(seconds);
          timetimeSeekHandler(seekTime);
        }
      }
    }
    annyang.addCommands(commands);
  }

  function initEvents() {
    appendScriptToDOM();
  }

  function appendScriptToDOM() {
    let addEventListener = function() {
      document.addEventListener('netflixSeek', function netflixInteractionHandler(event) {
        var seekTime = event.detail.seekTime;
        netflix.cadmium.UiEvents.events.resize[1].scope.events.dragend[1].handler(null, {value: seekTime, pointerEventData: {}});
      });
    }
    let src = document.createElement('script');
    src.innerHTML = '(' + addEventListener.toString() + ')();';
    document.head.appendChild(src);
  }

  (function init() {
    initEvents();
    initCommands();
    annyang.start();
    initDebugging();
  })();
};
},{}]},{},[1]);
