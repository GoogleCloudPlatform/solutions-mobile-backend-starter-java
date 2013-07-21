/*global hashnote */
'use strict';

hashnote.controller('NoteCtrl', function($scope, Api) {
	var api = gapi.client.mobilebackend.endpointV1;
	
	$scope.content = '';
	$scope.notes = $scope.notes || [];
	$scope.hashtags = $scope.hashtags || [];
	$scope.mentions = $scope.mentions || [];
	
	function refreshNotes() {
		Api.list(function(results) {
			$scope.$apply(function() {
				$scope.notes = results;
				
				// Get the hashtags and mentions
				$scope.hashtags = [];
				$scope.mentions = [];

		/*		angular.forEach($scope.notes, function(note, index) {
					// get the hashtags
					var hashtagPattern = /\B#(?:\[[^\]]+\]|\S+)/g;
					var tag = hashtagPattern.exec(note.properties.content);
					while (tag !== null) {
						if ($scope.hashtags.indexOf(tag) === -1) {
							$scope.hashtags.push(tag);
						}
					}
					
					// get the mentions
					var mentionPattern = /\B@(?:\[[^\]]+\]|\S+)/g;
					var tag = mentionPattern.exec(note.properties.content);
					while (tag !== null) {
						if ($scope.mentions.indexOf(tag) !== -1) {
							$scope.mentions.push(tag);
						}
					}
				});*/

			});
		});
	}
	
	$scope.addNote = function(content) {
		Api.insert({content: content}, function(results) {
			$scope.content = '';
			refreshNotes();
		});
	};
	
	$scope.removeNote = function(note) {
		Api.delete(note, function(results) {
			refreshNotes();
		});
	};
	
	refreshNotes();
});
