module.exports = {
    'getClientSourceFile': function () {
        return 'extension/content/client_main.js';
    },
    'getClientDestinationFile': function () {
        return 'client.js';
    },
    'getClientDestinationFolder': function () {
        return 'extension/build';
    }
};