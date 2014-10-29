define(['Utilities', 'Shapes', 'Core', 'TinyPubSub'], function(utilities, Shapes, Core, TinyPubSub) {

    'use strict';
    
    var size = 20;
    var npc;
    var npcs=[];
    var particles=[];
    var that;
    var baseName;
    var core;
    var msize=8.5;
    //var particleBaseName;
    
    function Particles(){
    	that = this;
    }
 
    
    function showParticles(scene, x, y) {
    	   var geometry = new THREE.IcosahedronGeometry(10, 2);
    	   var material = new THREE.PointCloudMaterial({
    	       color : 0x00AA00,
    	       size : 0.2
    	   });
    	   var particleSystem = new THREE.PointCloud(geometry, material);
    	   particleSystem.position.set(x, 10, y);
    	   scene.add(particleSystem);
    	   particles.push(particleSystem);
    	}
    
      function getName(baseName, x, z) {
        return baseName + x + z;
      }

/*    var objectName = getName(particleBaseName, x, z);
    var selectedObject = scene.getObjectByName(objectName);
    scene.remove(selectedObject);*/
    
    Particles.prototype.rotateParticlesAroundWorldAxis = 
        function(npcIndex, axis, radians, npc) {
            if (npcs.length > 0) {
                for (var i = 0; i < npcs.length; i++) {
                    var object;
                    if (npc === true) {
                        object = npcs[i];
                    } else {
                        object = particles[i];
                    }

                that.rotWorldMatrix = new THREE.Matrix4();
                that.rotWorldMatrix.makeRotationAxis(axis.normalize(),
                        radians);

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
                var shapes= new Shapes();
                core= new Core();
                core.gridNPCs=gridData;
                var c = document.getElementById("myCanvas");
				var context = c.getContext("2d");
                for (var i = 0; i < gridData.length; i++) {
                    var shapeType = 4;
                    console.log(gridData[i]);
                    for (var j = 0; j < gridData[0].length; j++) {
                        var npcValue = gridData[j][i];
                        if (npcValue !== 0) {
                            console.log("npcValue: ", npcValue);
                            shapes.addStarObject(npcs, scene, camera, true, j*size, i*size);
                            // addShape(shapeType, scene, camera, j, i, npcValue);
                            getName(npcValue,j,i); 
                            showParticles(scene, j * size, i * size);
                            context.fillStyle = "#800080";
							context.fillRect(i*msize, j*msize, msize, msize)

                        }
                    }
                }
               // $.subscribe('drawMap', core.gridNPCs);
            },

            error : utilities.showError
        });
       
      };
    return Particles;
    
});