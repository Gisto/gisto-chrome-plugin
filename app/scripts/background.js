'use strict';

chrome.runtime.onInstalled.addListener(function (details) {
    console.log('previousVersion', details.previousVersion);
});

var socket = io.connect('http://localhost:3000/');

socket.on('identify', function() {
    var user = localStorage.getItem('githubUser');
    console.log(user);
    if (user) {
        console.log('emitting connect event');
        socket.emit('registerClient', { user: user, token: '', plugin: true });

        var opt = {
            type: "basic",
            title: "Connected to notification server",
            message: "Connection was successful",
            iconUrl: "images/icon.png"
        };

        chrome.notifications.create('gisto-connected', opt, function() {});
    }
});

socket.on('receiveNotification', function(data) {

    // data - { sender: client.user, gistId: data.gistId, name: data.name, gravatar_id: data.gravatar_id})
    var options = {
        type: "basic",
        title: "You recieved a Gist on Gisto",
        message: "You were sent " + data.name + " by " + data.sender,
        iconUrl: "https://secure.gravatar.com/avatar/" + data.gravatar_id
    };

    chrome.notifications.create('gisto_gist_received', options, function() {});
});
