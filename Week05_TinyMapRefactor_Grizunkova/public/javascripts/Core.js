/*
//Core class with Singleton pattern 

define(function() {

	var elf = {};

	elf.Core = (function() {
		'use strict';

		var scene, camera, renderer;
		var gridMaze, gridNPCs;
		var _instance = null;
		//var value;
		
		
		function Core() {

			if (_instance === null) {
				_instance = this;
			} else {
				return _instance;
			}
		
		Object.defineProperty(this, "Scene", {
			get : function() {
				scene = new THREE.Scene();
				scene.fog = new THREE.Fog(0xffffff, 0, 750);
				//return Scene;
				return scene;
			},
			set : function(scene) {				
				Scene = scene;
			},
			enumerable : true,
			configurable : true
		});
		Object.defineProperty(this, "Camera", {
			get : function() {
				var screenWidth = window.innerWidth / window.innerHeight;
				camera = new THREE.PerspectiveCamera(75, screenWidth, 1, 1000);
				return camera;
			},
			set : function(value) {				
				
				Camera = value;
			},
			enumerable : true,
			configurable : true
		});
		Object.defineProperty(this, "Renderer", {
			get : function() {
				renderer = new THREE.WebGLRenderer({antialias : true});
				renderer.setClearColor(0xD6EBFF);
				renderer.setSize(window.innerWidth, window.innerHeight);
				document.body.appendChild(renderer.domElement);
				return renderer;
			},
			set : function(value) {				
				Renderer = value;
			},
			enumerable : true,
			configurable : true
		});
		Object.defineProperty(this, "GridMaze", {
			get : function() {
				//return gridMaze;
			},
			set : function(value) {
				this.GridMaze = value;
			},
			enumerable : true,
			configurable : true
		});
		Object.defineProperty(this, "GridNPCs", {
			get : function() {
				//return gridNPCs;
			},
			set : function(value) {
				this.GridNPCs = value;
			},
			enumerable : true,
			configurable : true
		});
		}
		if (_instance === null) {
			return this;
		} else {
			return _instance;
		}


		return Core;

	}());

	return elf.Core;
});

*/

define(function() {

	var elf = {};

	elf.Core = (function() {
		'use strict';

		var _instance = null;
	
		var scene = null;
		var camera = null;
		var gridMaze = null;
		var gridNPCs = null;

				
		function Core() {
			if (_instance === null) {
				_instance = this;
			} else {
				return _instance;
			}
			//initialize scene
			scene = new THREE.Scene();
			scene.fog = new THREE.Fog(0xffffff, 0, 750);
			//initialize camera
			var screenWidth = window.innerWidth / window.innerHeight;
			camera = new THREE.PerspectiveCamera(75, screenWidth, 1, 1000);
			
			gridMaze = [
			            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			            [1,0,1,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
			            [1,0,1,0,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,0,1],
			            [1,0,1,0,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,0,1],
			            [1,0,1,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
			            [1,0,1,0,1,1,0,1,1,0,1,1,0,1,0,1,1,0,1,0,1,1,0,1],
			            [1,0,1,0,1,1,0,1,1,0,1,1,0,1,0,1,1,0,1,0,1,1,0,1],
			            [1,0,1,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1],
			            [1,0,0,0,0,0,0,1,1,0,1,1,1,1,0,1,1,1,1,0,1,1,0,1],
			            [1,0,0,0,1,1,0,1,1,0,1,1,1,1,0,1,1,1,1,0,1,1,0,1],
			            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,1],
			            [1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,0,0,0,0,0,0,0,0,1],
			            [1,1,1,1,1,1,1,1,1,0,1,0,0,1,1,0,1,1,1,1,1,1,0,1],
			            [1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
			            [1,0,1,1,0,1,1,1,0,0,1,0,0,0,1,0,1,1,1,0,1,1,0,1],
			            [1,0,1,1,0,1,1,1,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,1],
			            [1,0,1,1,0,0,0,0,0,0,1,1,1,1,1,0,1,1,1,0,1,1,0,1],
			            [1,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
			            [1,0,1,1,1,1,1,1,0,1,1,1,1,1,1,0,1,1,1,0,1,1,0,1],
			            [1,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,1,1,0,1],
			            [1,0,1,1,1,0,1,1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1],
			            [1,0,1,1,1,0,1,1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1],
			            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
			            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
			        ]
			   
			
			
			gridNPCs = 
				[
				    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
				    [ 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 99, 0, 0, 0, 0 ],
				    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
				    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
				    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0 ],
				    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
				    [ 0, 5, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
				    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
				    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
				    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
				    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
				    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
				    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
				    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
				    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
				    [ 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
				    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
				    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
				    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
				    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
				    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
				    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
				    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
				    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
				]
		}


		Core.prototype.Scene = function() {
			return scene;
		};
		Core.prototype.Camera = function() {
			return camera;
		};
		Core.prototype.GridMaze = function() {
			return gridMaze;
		};
		Core.prototype.GridNPCs= function(){
			return gridNPCs;
		}

		
		return Core;

	}());

	return elf.Core;
});