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