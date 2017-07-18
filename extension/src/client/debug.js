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

module.exports = {
    "init": function() {
        assertAnnyangExists();
        logAnnyangListeningState();
        initCallbacks();
    }
}