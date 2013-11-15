'use strict';

var github = {
    client_id: '',
    client_secret: ''
};

function authorize() {
    window.location.href = "https://github.com/login/oauth/authorize?client_id=" + github.client_id
}

function deauthorize() {
    localStorage.removeItem('githubUser');
    checkAuthorized();
}

function getUser(access_token) {
    // return jquery ajax promise
    return $.ajax({
        url: "https://api.github.com/user?access_token=" + access_token,
        type: 'get',
        dataType: 'json',
        success: function(){console.log("get complete: ")},
        error: function(){}
    });
}

function checkAuthorized() {
    console.log('checkAuthorized');

    var user = localStorage.getItem('githubUser');
    var code = window.location.href.split('?code=');

    if (user) {
        $('#github').text('Logout').addClass('logged-in');
        return;
    } else if (code.length !== 2) {
        $('#github').text('Click here to authenticate').removeClass('logged-in');
        return; // not logged in and is not a callback for logging in stop processing
    }

    $.ajax('https://github.com/login/oauth/access_token', {
        data: {
            client_id: github.client_id,
            client_secret: github.client_secret,
            code: code[1]
        },
        dataType: 'json'
    }).success(function(data) {
            window.localStorage.setItem('accessToken', data.access_token);
        $.when(getUser(data.access_token)).done(function(data){
                window.localStorage.setItem("githubUser", data.login);
                window.location.href = "chrome-extension://nchjedfphpbelmkcgbbokaopjmocjfgi/options.html";
            }
        );
    });
}
checkAuthorized();

$('#github').click(function(e) {
    e.preventDefault();

    if ( $(this).hasClass('logged-in') ) {
        deauthorize();
    } else {
        authorize();
    }


});