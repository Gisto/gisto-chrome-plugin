'use strict';

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    alert('request recieved');
    if (request.method == "getSelection")
        sendResponse({data: window.getSelection().toString()});
    else
        sendResponse({}); // snub them.
});
