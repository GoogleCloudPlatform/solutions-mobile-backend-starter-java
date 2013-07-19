/*global hashnote */
'use strict';

hashnote.controller('HomeCtrl', function($rootScope, $scope, $location, $window, Auth) {

	$scope.login = function() {
		Auth.auth(function() {
			// success
			$location.path('/notes').replace();
			$scope.$apply();
		},
		function(resp) {
			// error
			console.error(JSON.stringify(resp));
			$rootScope.error = 'Failed to login: ' + resp.message;
		});
	}
});