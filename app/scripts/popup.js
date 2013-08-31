'use strict';

(function (chrome) {

    var tab = {};

    chrome.tabs.getSelected(null, function (data) {
        tab.id = data.id;
        tab.url = data.url;
        document.getElementById('pageUrl').innerText = tab.url;
    });

    chrome.extension.onRequest.addListener(
        function (request, sender, sendResponse) {
            // text selection is stored in request.selection
            document.getElementById('pageSelection').innerText = request.selection;
        }
    );

    chrome.tabs.executeScript(null, {code: "chrome.extension.sendRequest({selection: window.getSelection().toString() });"});


})(chrome);