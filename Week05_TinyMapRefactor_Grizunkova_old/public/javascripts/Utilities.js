define([ require ], function() {
	'use strict';
	var utilities = {
		showDebug : function(data) {
			console.log(data);
		},

		showError : function(request, ajaxOptions, thrownError) {
			showDebug("Error occurred: = " + ajaxOptions + " " + thrownError);
			showDebug(request.status);
			showDebug(request.statusText);
			showDebug(request.getAllResponseHeaders());
			showDebug(request.responseText);
		}
	}
	
	return utilities;
});