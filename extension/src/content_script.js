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