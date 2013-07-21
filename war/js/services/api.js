'use strict';

angular.module('hashnote')
.factory('Api', function($http) {

	var api = gapi.client.mobilebackend.endpointV1;
	
	var NOTE_TYPE = 'private_Note';
	
	var signedIn = false;
	
	return {
		list: function(next, query) {
			var defaultQuery = {
				kindName: NOTE_TYPE,
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
		},
		insert: function(data, next) {
			var defaultData = {
				kindName: NOTE_TYPE,
				properties: {}
			};
			
			var noteData = data || {};
			for (var prop in noteData) {
				if (noteData.hasOwnProperty(prop))
					defaultData.properties[prop] = noteData[prop];
			}
			
			$http({
				'url': API_ROOT + '/mobilebackend/v1/CloudEntities/insert/private_Note',
				'dataType': 'json',
				'method': 'POST',
				'data': JSON.stringify(defaultData),
				'headers': {
					'Content-Type': 'application/json; charset=utf-8'
				}
			}).success(function(resp) {
				next(resp);
			}).error(function(error) {
				next(error);
			});
		},
		delete: function(note, next) {
			api.delete({'kind': 'private_Note', 'id': note}).execute(function (resp) {
				next(resp);
			});
		}
	};
});