define([ require ], function() {

	'use strict';

	var scene = null;
	var camera = null;
	var renderer = null;

	var cube = null;
	var size = 20;
	var cubes = [];
	var eyex = 200;
	var eyez = 300;

	function MazePath() {}

	function addCube(scene, camera, wireFrame, x, z) {

		var geometry = new THREE.BoxGeometry(size, size, size);

		var material = new THREE.MeshLambertMaterial({
			map : THREE.ImageUtils.loadTexture('./images/crate.jpg')
		});
		var cube = new THREE.Mesh(geometry, material);
		cube.position.set(x, 10, z);
		scene.add(cube);
		cubes.push(cube);
		return cube;
	}

	MazePath.prototype.addCubes= function(scene, camera, wireFrame) {

		$.getJSON("Grid000.json", function(json) {
			var max = json.length;

			for (var i = 0; i < max; i++) {//can be change i to z
				for (var j = 0; j < max; j++) {//can change j to x
					//console.log(json[j]);
				//	console.log(j);
					if (json[i][j] === 1) {
						addCube(scene, camera, wireFrame, i * size, j * size);
					}
					//console.log(json[i][j]);
					//console.log(json[j]);
				}
			}
		});
	}
	return MazePath;
});