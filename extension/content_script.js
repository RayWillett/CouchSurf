(function couchSurf(DEBUG) {
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
})(DEBUG = false);