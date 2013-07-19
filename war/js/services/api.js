'use strict';

angular.module('hashnote')
.factory('Api', function() {

	var api = gapi.client.mobilebackend.endpointV1;
	
	var CLIENT_ID = '969710371001-ast1fj90jh46qcaqucp17flcmobfners.apps.googleusercontent.com';
	var SCOPES = ['https://www.googleapis.com/auth/userinfo.email'];
	
	var signedIn = false;
	
	return {
		list: function(next, query) {
			var defaultQuery = {
				kindName: 'private_Note',
				scope: 'FUTURE_AND_PAST'
			};
			
			var noteQuery = query || {};
			for (var el in noteQuery) {
				if (noteQuery.hasOwnProperty(el))
					defaultQuery[el] = noteQuery[el];		
			}
			
			api.list(defaultQuery).execute(function(resp) {
				next(resp.entries);
			});
		}
	};
});