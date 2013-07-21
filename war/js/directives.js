'use strict';

/* Directives */

angular.module('hashnote')
.directive('activeNav', ['$location', function($location) {
    return {
        restrict: 'A',
        link: function($scope, element, attrs) {
            var nestedA = element.find('a')[0];
            var path = nestedA.href;

            $scope.location = $location;
            $scope.$watch('location.absUrl()', function(newPath) {
                if (newPath === path) {
                    element.addClass('active');
                } else {
                    element.removeClass('active');
                }
            });
        }
    };
}]);