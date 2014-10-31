/**
 * @author Charlie Calvert
 */

require.config({
	baseUrl : '.',
	paths : {
		"jquery" : 'javascripts/jquery-2.1.1',		
		"Control" : 'javascripts/Control',
		"Utilities" : 'javascripts/Utilities',
		
	}
});
	

require([ 'jquery',  'Control' ], function(jq,  Control) {

	'use strict';

	$(document).ready(function() {
		var control = new Control();
	});

});
