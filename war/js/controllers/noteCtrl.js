/*global hashnote */
'use strict';

hashnote.controller('NoteCtrl', function($scope, Api) {
	var api = gapi.client.mobilebackend.endpointV1;
	
	$scope.content = '';
	$scope.notes = $scope.notes || [];
	
	Api.list(function(results) {
		$scope.$apply(function() {
			$scope.notes = results;
		});
	});
	
	$scope.addNote = function(content) {
		api.insert({kindName: 'private_Note', properties: {content: content}}).execute(function (resp) {
			$scope.content = '';
		})
	}
});
