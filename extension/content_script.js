function couchSurf() {
  function seekHandler(seekTime) {
    netflix.cadmium.UiEvents.events.resize[1].scope.events.dragend[1].handler(null, {value: seekTime, pointerEventData: {}});
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
          seekHandler(seekTime);
        }
      },
      'go back :seconds (seconds)': function(seconds) {
        if (isNaN(seconds)) {
          return;
        } else {
          const seekTime = calculateOffsetSeekTime(-seconds);
          seekHandler(seekTime);
        }
      },
      'go forward :seconds (seconds)': function(seconds) {
        if (isNaN(seconds)) {
          return;
        } else {
          const seekTime = calculateOffsetSeekTime(seconds);
          seekHandler(seekTime);
        }
      }
    }
    annyang.addCommands(commands);
  }
  
  function importAnnyang() {
    let imported_script = document.createElement('script');
    imported_script.src = "https://cdnjs.cloudflare.com/ajax/libs/annyang/2.6.0/annyang.min.js";
    document.head.appendChild(imported_script);
    return;
  }

  function initCallbacks() {
    annyang.addCallback('result', function(results) {
      console.log(results);
    });
  } 

  function init() {
    console.log('initializing');
    //importAnnyang();
    if (typeof annyang === "undefined") {
      window.setTimeout(function () {
        initCommands();
        initCallbacks();
        annyang.start();
      }, 1000);
    } else {
      initCommands();
      initCallbacks();
      annyang.start();
    }
    console.log('Annyang is listening!');
  }
  init();
}
couchSurf();


// content_script has access to DOM, but not the same window object. Gonna have to get clever, here.


var triggerEvent = function triggerEvent () {
    var event = document.createEvent('Event');
    event.initEvent('scriptInjected', true, true);
    document.dispatchEvent(event);
 };
 var addEventListener = function addListenerEvent () { 
   document.addEventListener('scriptInjected', function(e) {
     let seekTime = 100;
     alert(netflix);
     netflix.cadmium.UiEvents.events.resize[1].scope.events.dragend[1].handler(null, {value: seekTime, pointerEventData: {}});
    }
  )};

 var trigger = document.createElement('script');
 trigger.innerText = triggerEvent.toString() + "\n triggerEvent();";

 var listener = document.createElement('script');
 listener.innerText = addEventListener.toString() + "\n addListenerEvent();";

 document.head.appendChild(listener);
 document.head.appendChild(trigger);