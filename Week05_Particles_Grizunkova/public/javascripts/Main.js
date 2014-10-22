/**
 * @author Charlie Calvert
 */

require.config({
	baseUrl : '.',
	paths : {
		"jquery" : 'javascripts/lip/jquery-2.1.1',
		"Three" : 'javascripts/lip/three',
		"Control" : 'javascripts/Control',
		"Floors" : 'javascripts/Maze/Floors',
		"Particles" : 'javascripts/Maze/Particles',
		"Utilities" : 'javascripts/Utilities',
		"Shapes" : 'javascripts/Maze/Shapes',
		"MazePath" : 'javascripts/Maze/MazePath',
		"PointerLockControls" : 'javascripts/lip/PointerLockControls',
		"PointerLockSetup" : 'javascripts/Maze/PointerLockSetup',
		"MTLLoader" : 'javascripts/lip/MTLLoader',
		"OBJMTLLoader" : 'javascripts/lip/OBJMTLLoader',
		"ColladaLoader" : 'javascripts/lip/ColladaLoader'

	},
	shim : {
		'Three' : {
			exports : 'Three'
		},
		'PointerLockControls' : {
			exports : 'PointerLockControls'
		},
		'MTLLoader' : {
			exports : 'MTLLoader'
		},
		'OBJMTLLoader' : {
			exports : 'OBJMTLLoader'
		}

	}
});

require([ 'jquery', 'Three', 'Control' ], function(jq, Three, Control) {

	'use strict';

	$(document).ready(function() {
		var control = new Control();
	});

});
