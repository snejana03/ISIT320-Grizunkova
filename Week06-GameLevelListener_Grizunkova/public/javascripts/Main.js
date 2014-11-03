/**
 * @author Charlie Calvert
 */



require.config({
	baseUrl : '.',
	paths : {
		"jquery" : 'javascripts/jquery-2.1.1',
		'Sockets' : '/socket.io/socket.io',
		"Control" : 'javascripts/Control',
		"Utilities" : 'javascripts/Utilities',
		
	},
	
	shim : {
		'Sockets' : {
			exports : 'io'
		}
	}
});
	

require([ 'jquery', 'Control' ], function(jq,  Control) {

	'use strict';

	$(document).ready(function() {
		var control = new Control();
	});

});
