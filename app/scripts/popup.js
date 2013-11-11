'use strict';

(function (chrome) {

    var currentSelection = null;
    var currentTab = null;

    chrome.tabs.getSelected(null, function (tab) {
        currentTab = tab.url;
        document.getElementById('pageUrl').innerText = tab.url;
    });

    chrome.extension.onRequest.addListener(
        function (request, sender, sendResponse) {
            // text selection is stored in request.selection
            currentSelection = request.selection;
            document.getElementById('pageSelection').innerText = request.selection;
        }
    );

    var sendButton = document.querySelector('#gisto-send');
    sendButton.addEventListener('click', function (e) {
        alert('button clicked');

        if (currentTab && currentSelection) {
            chrome.runtime.sendMessage({
                type: 'send',
                title: 'test title',
                data: [
                    {filename: 'file1.txt', content: currentSelection},
                    {filename: 'source.txt', content: currentTab}
                ]
            }, function (response) {

            });
        }


    });

    chrome.tabs.executeScript(null, {code: "chrome.extension.sendRequest({selection: window.getSelection().toString() });"});


})(chrome);