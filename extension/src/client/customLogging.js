module.exports = {
    "createMessage": function(message) {
        return {
            "error": message,
            "arguments": arguments,
            "date": Date()
        };
    }
}