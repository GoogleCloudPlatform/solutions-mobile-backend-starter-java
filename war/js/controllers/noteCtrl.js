/*global hashnote */
'use strict';

hashnote.controller('NoteCtrl', function($scope, Api) {
	var api = gapi.client.mobilebackend.endpointV1;
	
	$scope.content = '';
	$scope.notes = $scope.notes || [];
	
	function refreshNotes() {
		Api.list(function(results) {
			$scope.$apply(function() {
				$scope.notes = results;
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
