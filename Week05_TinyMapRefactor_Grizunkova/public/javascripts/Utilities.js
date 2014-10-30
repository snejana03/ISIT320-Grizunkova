define([ require ], function() {
	'use strict';
	var utilities = {
		showDebug : function(data) {
			console.log(data);
		},

		/*
		 * drawText: function(controlObject, position, partPosition){
		 * $('#cameraX').html(Math.floor(position.x)/20);
		 * $('#cameraY').html(Math.floor(position.y)/20);
		 * $('#cameraZ').html(Math.floor(position.z)/20);
		 * $('#particleX').html(partX); //$('#particleY').html(y/size);
		 * $('#particleZ').html(partZ); },
		 */

		iterate : function(gridData, callback) {
			if (gridData) {
				for (var z = 0; z < gridData.length; z++) {
					for (var x = 0; x < gridData[0].length; x++) {
						var npcValue = gridData[z][x];
						callback(x, z, npcValue)
					}
				}
			}
		},
		redrawMap : function(gridData, npcType, type) {
			var c = document.getElementById("myCanvas");
			var ctx = c.getContext("2d");
			var blockSize = 8.5;
			iterate(gridData, function(x, z, npcType) {
				if (type === maze) {
					if (npcType === 1) {
						ctx.fillStyle = "#FF0000";
					}
				} 
				if(type===particle){
					ctx.fillStyle = "#800080";
				}
				if(type===me){
					ctx.fillStyle = "#00FF00";
				}
				ctx.fillRect(x * blockSize, z * blockSize, blockSize,
								blockSize);

			});
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
