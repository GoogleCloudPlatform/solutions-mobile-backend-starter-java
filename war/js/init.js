// init.js
//
// Handles authentication related items.

//API_ROOT = 'https://black-circle-221.appspot.com/';
API_ROOT = '//' + window.location.host + '/_ah/api';
CLIENT_ID = '969710371001-ast1fj90jh46qcaqucp17flcmobfners.apps.googleusercontent.com';
SCOPES = ['https://www.googleapis.com/auth/userinfo.email'];

window.init = function() {
	// Loads the OAuth and Hashnote APIs asynchronously, and triggers login
	// when they have completed.
	var apisToLoad;
	var callback = function() {
		if (--apisToLoad == 0) {
			angular.bootstrap(document, ['hashnote']);
		}
	}
	
	apisToLoad = 2;
	gapi.client.load('mobilebackend', 'v1', callback, API_ROOT);
	gapi.client.load('oauth2', 'v2', callback);
}