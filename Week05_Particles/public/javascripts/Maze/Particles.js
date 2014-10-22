define(['Utilities', 'Shapes'], function(utilities, Shapes) {

    'use strict';
    
    var size =20;
    var npc;
    var npcs=[];
    var particles=[];
    
    function Particles(){}
 
    
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
                for (var i = 0; i < gridData.length; i++) {
                    var shapeType = 4;
                    console.log(gridData[i]);
                    for (var j = 0; j < gridData[0].length; j++) {
                        var npcValue = gridData[j][i];
                        if (npcValue !== 0) {
                            console.log("npcValue: ", npcValue);
                            shapes.addStarObject(npcs, scene, camera, true, j, i);
                            // addShape(shapeType, scene, camera, j, i, npcValue);
                            showParticles(scene, j * size, i * size);
                        }
                    }
                }
            },

            error : utilities.showError
        });
    };
    return Particles;
    
});