'use strict';

/* Controllers */

angular.module('hashnote')
.controller('NavCtrl', ['$scope', '$location', function($scope, $location) {
	
	$scope.logout = function() {
	
	};
}]);

angular.module('hashnote')
.controller('HomeCtrl', 
	['$rootScope', '$scope', '$location', '$window', 'Auth', function($rootScope, $scope, $location, $window, Auth) {

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
	}]);

angular.module('hashnote')
.controller('NoteCtrl', [function() {

}]);