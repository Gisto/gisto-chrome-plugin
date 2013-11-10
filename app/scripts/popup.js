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

    var sendButton = document.querySelector('#gisto-send');
    sendButton.addEventListener('click', function(e) {
       alert('button clicked');

        chrome.runtime.sendMessage({type: 'send', data: 'hello i am here'}, function(response) {
            alert('recieved response');
        });

    });

    chrome.tabs.executeScript(null, {code: "chrome.extension.sendRequest({selection: window.getSelection().toString() });"});


})(chrome);