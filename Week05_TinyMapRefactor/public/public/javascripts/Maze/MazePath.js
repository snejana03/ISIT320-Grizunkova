define([ "Utilities","Core", "TinyPubSub" ], function(utilities, Core, TinyPubSub) {

	'use strict';

	var cube = null;
	var size = 20;
	var cubes = [];
	var eyex = 200;
	var eyez = 300;
	var core=new Core();
	var msize=8.5;
	var maze;

	function MazePath() {}

	function addCube(scene, camera, wireFrame, x, z) {
        core= new Core();
		var geometry = new THREE.BoxGeometry(size, size, size);

		var material = new THREE.MeshLambertMaterial({
			map : THREE.ImageUtils.loadTexture('./images/crate.jpg')
		});
		var cube = new THREE.Mesh(geometry, material);
		cube.position.set(x, 10, z);
		core.scene.add(cube);
		cubes.push(cube);
		return cube;
	}

/*	MazePath.prototype.addCubes= function(scene, camera, wireFrame) {

		$.getJSON("Grid000.json", function(json) {
			var max = json.length;

			for (var i = 0; i < max; i++) {//can be change i to z
				for (var j = 0; j < max; j++) {//can change j to x
					//console.log(json[j]);
				    //console.log(j);
					if (json[i][j] === 1) {
						addCube(scene, camera, wireFrame, i * size, j * size);
					}
					//console.log(json[i][j]);
					//console.log(json[j]);
				}
			}
		});
	}*/
	MazePath.prototype.collisionDetection = function(position) {
		// Collision detection
		raycaster.ray.origin.copy(position);
		// raycaster.ray.origin.y -= 10;
		var dir = controls.getDirection(new THREE.Vector3(0, 0, 0)).clone();
		raycaster.ray.direction.copy(dir);

		var intersections = raycaster.intersectObjects(cubes);

		// If we hit something (a wall) then stop moving in
		// that direction
		if (intersections.length > 0 && intersections[0].distance <= 215) {
			console.log("intersection:",intersections.length);
			controls.isOnObject(true);
		}
	}
	
	MazePath.prototype.getCubes = function() {
		return cubes;
	}
		
	MazePath.prototype.addCubes = function(fileName, scene, camera, wireFrame) {
		$.ajax({
			url : fileName,
			cache : false,
			type : "GET",
			dataType : "json",
			success : function(gridData) {
				utilities.showDebug('Opening file: ' + fileName);				
				core.gridMaze=gridData;
				var c = document.getElementById("myCanvas");
				var context = c.getContext("2d");
				for (var i = 0; i < gridData.length; i++) {
					console.log(gridData[i]);
					for (var j = 0; j < gridData[0].length; j++) {
						if (gridData[j][i] === 1) {
							console.log(gridData[j][i]);
							addCube(scene, camera, wireFrame,i * size, j* size);
							context.fillStyle = "#FF0000";
							context.fillRect(i*msize, j*msize, msize, msize)
						}
					}
				}
				return gridData;
				//$.publish('drawMap',gridData,{type:"maze"}, 'Please redraw mini map');
				$.publish('drawMap',{type:"maze"}, 'Please redraw mini map');
				
				
			},

			error : utilities.showError
		});
	   
	};
	return MazePath;
});