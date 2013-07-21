'use strict';

/* Filters */

angular.module('hashnote').
  filter('interpolate', ['version', function(version) {
    return function(text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    }
  }]);

angular.module('hashnote').
  filter('tagFilter', function() {
	  return function(input, filterArray) {
	  	if (filterArray.length === 0)
	  		return true;
	  		
	  	var found = false;
	  	angular.forEach(filterArray, function(filter, index) {
			if (input.indexOf(filter) !== -1)
				found = true;
		});
		return found;
	  }
  });