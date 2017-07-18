module.exports = function(message) {
    return {
        "error": message,
        "arguments": arguments,
        "date": Date()
      };
  }