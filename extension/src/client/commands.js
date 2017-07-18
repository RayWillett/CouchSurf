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