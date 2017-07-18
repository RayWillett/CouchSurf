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