/*
*Core class with Singleton pattern 
*/
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
				return scene;
			},
			set : function(value) {
				Scene = value;
			},
			enumerable : true,
			configurable : true
		});
		Object.defineProperty(this, "Camera", {
			get : function() {
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
				return gridMaze;
			},
			set : function(value) {
				GridMaze = value;
			},
			enumerable : true,
			configurable : true
		});
		Object.defineProperty(this, "GridNPCs", {
			get : function() {
				return gridNPCs;
			},
			set : function(value) {
				GridNPCs = value;
			},
			enumerable : true,
			configurable : true
		});
		}
/*		if (_instance === null) {
			return this;
		} else {
			return _instance;
		}*/

	//}
		return Core;

	}());

	return elf.Core;
});