'use strict';

angular.module('hashnote')
.factory('Auth', function($http, $cookieStore) {
	
	var CLIENT_ID = '969710371001-ast1fj90jh46qcaqucp17flcmobfners.apps.googleusercontent.com';
	var SCOPES = ['https://www.googleapis.com/auth/userinfo.email'];
	
	var signedIn = false;
	
	return {
		authorize: function(accessLevel) {
			return accessLevel === undefined || accessLevel === 'public' || signedIn;
		},
		isLoggedIn: function() {
			return signedIn;
		},
		signin: function(mode, success, error) {
			gapi.auth.authorize({
				client_id: CLIENT_ID,
				scope: SCOPES,
				immediate: mode,
				response_type: 'token id_token'},
				function() {
					gapi.client.oauth2.userinfo.get().execute(function(resp) {
						if (!resp.code) {
							var token = gapi.auth.getToken();
							token.access_token = token.id_token;
							gapi.auth.setToken(token);
							signedIn = true;
							success();
						} else {
							error(resp);
						}
					});
				}
			);
			
		},
		auth: function(success, error) {
			if (!signedIn) {
				this.signin(false, success, error);
			} else {
				signedIn = false;
				success();
			}
		}
	};
});

angular.module('hashnote')