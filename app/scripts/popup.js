'use strict';

(function (chrome) {

    chrome.tabs.getSelected(null, function (tab) {
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