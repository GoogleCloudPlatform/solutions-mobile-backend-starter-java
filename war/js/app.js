'use strict';

var hashnote = angular.module('hashnote', ['ngCookies']);

hashnote.config(['$routeProvider', '$locationProvider', '$httpProvider', function($routeProvider, $locationProvider, $httpProvider) {

		var access = roles.accessLevels;

		$routeProvider.when('/', 
			{
				templateUrl: 'partials/home.html',
				controller:  'HomeCtrl'
			});
    	$routeProvider.when('/notes',
	    	{
	    		templateUrl: '/partials/notes.html',
	    		controller:  'NoteCtrl',
	    		access:      'user'
	    	});
    	$routeProvider.when('/404',
	    	{
	    		templateUrl: '/partials/404.html'
	    	});
    	$routeProvider.otherwise({redirectTo: '/'});

    	$locationProvider.html5Mode(false);

    	var interceptor = ['$location', '$q', function($location, $q) {
    		function success(response) {
    			return response;
    		}

    		function error(response) {

    			if (response.status === 401) {
    				$location.path('/');
    				return $q.reject(response);
    			} else {
    				return $q.reject(response);
    			}
    		}

    		return function(promise) {
    			return promise.then(success, error);
    		}
    	}];

    	$httpProvider.responseInterceptors.push(interceptor);

  }])
  
  .run(['$rootScope', '$location', 'Auth', function ($rootScope, $location, Auth) {
  
	  Auth.signin(true, function() {
			// success
			$location.path('/notes').replace();
			$rootScope.$apply();
		});
  	
  	$rootScope.$on('$routeChangeStart', function (event, next, current) {
	  	$rootScope.error = null;
	  	if (!Auth.authorize(next.access)) {
		  	$location.path('/');
	  	}
  	});
  	
  }]);
