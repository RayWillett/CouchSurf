

module.exports = {
    "init": function() {
        let addEventListener = function() {
            document.addEventListener('couchSurfSeek', function netflixInteractionHandler(event) {
                var seekTime = event.detail.seekTime;
                netflix.cadmium.UiEvents.events.resize[1].scope.events.dragend[1].handler(null, {value: seekTime, pointerEventData: {}});
            });
        }
        let src = document.createElement('script');
        src.innerHTML = '(' + addEventListener.toString() + ')();';
        document.head.appendChild(src);
    }
}