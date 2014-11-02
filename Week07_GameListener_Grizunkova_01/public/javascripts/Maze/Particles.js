define([ 'Utilities', 'Shapes', 'Core', 'TinyPubSub' ],
		function(utilities, Shapes, Core, TinyPubSub) {

			'use strict';

			var size = 20;
			var npc;
			var npcs = [];
			var particles = [];
			var that;
			var baseName;
			var core = new Core();
			var msize = 8.5;
			var particleBaseName = "myParticle";
			var shapes = new Shapes();
			var myGrid;
			var npcX;
			var npcZ;
			var particle;
			var npcValue;
			var shapeType;


			function Particles() {
				that = this;
			}

			
			function showParticles(x, z, particleName) {
				var geometry = new THREE.IcosahedronGeometry(10, 2);
				var material = new THREE.PointCloudMaterial({
					color : 0x00AA00,
					size : 0.2
				});
				var particleSystem = new THREE.PointCloud(geometry, material);
				particleSystem.position.set(x, 10, z);
				npcX=Math.round(x/size);
				npcZ=Math.round(z/size);
				particleSystem.name = particleName;
				core.scene.add(particleSystem);
				particles.push(particleSystem);
				
			}
			
			
			Particles.prototype.getNpcX = function() {
				return npcX;				
			}
			
			Particles.prototype.getNpcZ = function() {
				return npcZ;				
			}

			function getName(baseName, x, z) {
				return baseName + x + z;
			}
			
			Particles.prototype.rotateParticlesAroundWorldAxis = function(
					npcIndex, axis, radians, npc) {
				if (npcs.length > 0) {
					for (var i = 0; i < npcs.length; i++) {
						var object;
						if (npc === true) {
							object = npcs[i];
						} else {
							object = particles[i];
						}

						that.rotWorldMatrix = new THREE.Matrix4();
						that.rotWorldMatrix.makeRotationAxis(axis.normalize(),radians);

						that.rotWorldMatrix.multiply(object.matrix); // pre-multiply

						object.matrix = that.rotWorldMatrix;

						object.rotation.setFromRotationMatrix(object.matrix);
					}
				}
			};

			Particles.prototype.initNpc = function(fileName, scene, camera) {
				$.ajax({
					url : fileName,
					cache : false,
					type : "GET",
					dataType : "json",
					success : function(gridData) {
						utilities.showDebug('Opening file: ' + fileName);
						// var shapes= new Shapes();
						// core= new Core();
						// core.gridNPCs=gridData;
						var c = document.getElementById("myCanvas");
						var context = c.getContext("2d");
						for (var i = 0; i < gridData.length; i++) {
							 shapeType = 4;
							console.log(gridData[i]);
							for (var j = 0; j < gridData[0].length; j++) {
								 npcValue = gridData[j][i];
								if (npcValue !== 0) {
									console.log("npcValue: ", npcValue);
									shapes.addStarObject(npcs, scene, camera,
											true, j * size, i * size, getName(particleBaseName, j, i));
							
									showParticles(j * size, i * size, getName(particleBaseName, j, i));
	      							context.fillStyle = "#800080";
									context.fillRect(i * msize, j * msize,
											msize, msize)

								}
							}
						}
						myGrid = gridData;
						//return gridData;
						$.publish('drawMap',gridData, {type:"particle"},'Please redraw mini map');
					},

					error : utilities.showError
				});

				Particles.prototype.isNpc = function(x, z) {
			 if (myGrid && x >= 0 && x < myGrid.length && z >= 0 && z < myGrid[0].length ) {
					return myGrid[x][z] !== 0;
					}
					return false;
				};

				Particles.prototype.NPCs = function(x, z, value) {
					if (myGrid[x][z] !== 0 && value === 0) {
						var objectName = getName(particleBaseName, x, z);
						var selectedObject = core.scene.getObjectByName(objectName);
						core.scene.remove(selectedObject);
					}

					myGrid[x][z] = value;
				};

			};
			return Particles;

		});