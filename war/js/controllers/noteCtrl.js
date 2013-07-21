/*global hashnote */
'use strict';

hashnote.controller('NoteCtrl', function($scope, Api) {
	var api = gapi.client.mobilebackend.endpointV1;
	
	$scope.content = '';
	$scope.notes = $scope.notes || [];
	$scope.hashtags = $scope.hashtags || [];
	$scope.mentions = $scope.mentions || [];
	$scope.filter = [];
	
	function refreshNotes() {
		Api.list(function(results) {
			$scope.$apply(function() {
				$scope.notes = results;
				
				// Get the hashtags and mentions
				$scope.hashtags = [];
				$scope.mentions = [];

				angular.forEach($scope.notes, function(note, index) {
					var text = note.properties.content;
					
					// Add collections for the hashtags and mentions
					note.hashtags = [];
					note.mentions = [];
					
					var hashtagPattern = /\B#(?:\[[^\]]+\]|\S+)/g;
			    	var tag = hashtagPattern.exec(text);
					while (tag !== null) {
						var hashtag = tag[0];
						
						if (note.hashtags.indexOf(hashtag) === -1)
							note.hashtags.push(hashtag);
						
						if ($scope.hashtags.indexOf(hashtag) === -1)
							$scope.hashtags.push(hashtag);
						
						tag = hashtagPattern.exec(text);
					}
					
					var mentionPattern = /\B@(?:\[[^\]]+\]|\S+)/g;
			    	var tag = mentionPattern.exec(text);
					while (tag !== null) {
						var mention = tag[0];
						
						if (note.mentions.indexOf(mention) === -1)
							note.mentions.push(mention);
						
						if ($scope.mentions.indexOf(mention) === -1)
							$scope.mentions.push(mention);
						
						tag = mentionPattern.exec(text);
					}
				});

				$scope.filteredNotes = $scope.notes;
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
	
	$scope.selectFilter = function(name) {
		if ($scope.filter.indexOf(name) === -1) {
			$scope.filter.push(name);
		} else {
			$scope.filter.splice($scope.filter.indexOf(name), 1);
		}
	};
	
	$scope.filterClass = function(tag) {
		return $scope.filter.indexOf(tag) === -1 ? '' : 'selected';
	}
	
	refreshNotes();
});
