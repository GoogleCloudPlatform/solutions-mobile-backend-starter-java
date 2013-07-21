'use strict';

/* Filters */

angular.module('hashnote').
  filter('tagFilter', function() {
	  return function(input, filterArray) {
	  	if (filterArray.length === 0)
	  		return input;
	  		
	  	var out = [];
	  	angular.forEach(input, function(note, index) {
	  		var text = note.properties.content;
	  		var count = 0;
	  		angular.forEach(filterArray, function(filter, index) {
				if (text.indexOf(filter) !== -1)
					++count;
	  		});
	  		
	  		// All filter items match
	  		if (count === filterArray.length)
	  			out.push(note);
		});
		return out;
	  }
  });