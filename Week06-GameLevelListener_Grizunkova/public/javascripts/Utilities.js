define([ require ], function() {	
	'use strict';
	
	var blockSize=8.5;
	var gridData;
	var maze;
	var grid;
	var particles;
	var type;
	var npcType;
	
	
	var utilities = {
		showDebug : function(data) {
			console.log(data);
		},

		drawText : function(controlObject, position, partPosition) {
			/*
			 * $('#cameraX').html(Math.floor(position.x)/20);
			 * $('#cameraY').html(Math.floor(position.y)/20);
			 * $('#cameraZ').html(Math.floor(position.z)/20);
			 */
			//$('#npcx').html(partX);
			//$('#npcz').html(partZ);
		},

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
		redrawMap : function(grid, particles, npcType, type) {
			var c = document.getElementById("myCanvas");
			var ctx = c.getContext("2d");
			var blockSize = 8.5;
			utilities.iterate(gridData, function(x, z, npcType) {
				if (type === maze) {
					if (npcType === 1) {
						ctx.fillStyle = "#FF0000";
					} else {
						ctx.fillStyle = "#FFE4C4";
					}
				}
				if (type === particle) {

					ctx.fillStyle = "#800080";

					if (npcType === 0) {
						ctx.fillStyle = "#FFE4C4";
					}

				}
				if (type === me) {
					ctx.fillStyle = "#00FF00";
				}
				ctx
						.fillRect(x * blockSize, z * blockSize, blockSize,
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