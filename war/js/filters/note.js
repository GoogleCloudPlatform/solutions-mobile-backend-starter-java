'use strict';

/* Filters */

angular.module('hashnote').
  filter('note', function() {
    return function(text) {
	    var styled = text;
    	var hashtagPattern = /\B#(?:\[[^\]]+\]|\S+)/g;
    	var tag = hashtagPattern.exec(text);
		while (tag !== null) {
			var hashtag = tag[0];
			
			var hash = 0;
			for (var i = 0; i < hashtag.length; i++) {
				hash = 31*hash + hashtag.charCodeAt(i);
			}
			
			styled = styled.replace(new RegExp(hashtag, 'g'), '<span class="hashtag-' + hash % 5 + '">' + hashtag + '</span>');
			
			tag = hashtagPattern.exec(text);
		}
		
		var mentionPattern = /\B@(?:\[[^\]]+\]|\S+)/g;
    	var tag = mentionPattern.exec(text);
		while (tag !== null) {
			var mention = tag[0];
			
			var hash = 0;
			for (var i = 0; i < mention.length; i++) {
				hash = 31*hash + mention.charCodeAt(i);
			}
			
			styled = styled.replace(new RegExp(mention, 'g'), '<span class="mention-' + hash % 5 + '">' + mention + '</span>');
			
			tag = mentionPattern.exec(text);
		}
		
		return styled;
    }
  });

angular.module('hashnote').
  filter('hashtag', function() {
	  return function(text) {
		var hash = 0;
		for (var i = 0; i < text.length; i++) {
			hash = 31*hash + text.charCodeAt(i);
		}
		
		return '<span class="hashtag-' + hash % 5 + '">' + text + '</span>';
	  }
  });


angular.module('hashnote').
  filter('mention', function() {
	  return function(text) {
		var hash = 0;
		for (var i = 0; i < text.length; i++) {
			hash = 31*hash + text.charCodeAt(i);
		}
		
		return '<span class="mention-' + hash % 5 + '">' + text + '</span>';
	  }
  });
