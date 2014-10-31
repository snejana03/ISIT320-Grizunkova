define([ require ], function() {
	'use strict';
	var utilities = {
		showDebug : function(data) {
			console.log(data);
		},
		
/*		drawText: function(controlObject, position, partPosition){
			$('#cameraX').html(Math.floor(position.x)/20);
			$('#cameraY').html(Math.floor(position.y)/20);
			$('#cameraZ').html(Math.floor(position.z)/20);
			$('#particleX').html(partX);
			//$('#particleY').html(y/size);
			$('#particleZ').html(partZ);			
		},*/

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