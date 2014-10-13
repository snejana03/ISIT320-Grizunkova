define([ "Floors" ,"PointerLockControls","PointerLockSetup"], function(Floors, PointerLockControls, PointerLockSetup) {

	var scene = null;
	var camera = null;
	var renderer = null;

	
	var cube = null;
	var size=20;
	var cubes = [];

	var keyMove = {
		moveForward : false,
		moveBackward : false,
		moveLeft : false,
		moveRight : false
	};

	var cameraPosition = {
		x : 2,
		y : 0,
		z : 2
	}


	function Control() {

		init();
		animate();
	}

	function init() {

	    var screenWidth = window.innerWidth / window.innerHeight;
	    camera = new THREE.PerspectiveCamera(75, screenWidth, 1, 1000);

	    scene = new THREE.Scene();
	    scene.fog = new THREE.Fog(0xffffff, 0, 750);

	    addCubes(scene, camera, false);
	    doPointerLock();

	    addLights();

	    var floors = new Floors();
	    floors.drawFloor(scene);

	    raycaster = new THREE.Raycaster(new THREE.Vector3(), 
	        new THREE.Vector3(0, -1, 0), 0, 10);

	    renderer = new THREE.WebGLRenderer({ antialias : true });
	    
	    renderer.setSize(window.innerWidth, window.innerHeight);
	    document.body.appendChild(renderer.domElement);

	    window.addEventListener('resize', onWindowResize, false);
	    
	    $("#gameData").load("GameData.html");
	    
	    $.getJSON("GameData.json", function(json){
			$("gameJason").html(json[0].Name);
			});
	}



	function doPointerLock() {
		controls = new THREE.PointerLockControls(camera);
		var yawObject = controls.getObject();
		scene.add(yawObject);

		// Move camera to the 1, 1 position
		yawObject.position.x = size+200;
		yawObject.position.z = size+300;

		var ps = new PointerLockSetup(controls);
	}

	function animate() {

	    requestAnimationFrame(animate);

	    var xAxis = new THREE.Vector3(1, 0, 0);

	    controls.isOnObject(false);

	    var controlObject = controls.getObject();
	    var position = controlObject.position;
	                
	     drawText(controlObject, position);
	     
    collisionDetection(position);

	    // Move the camera
	    controls.update();

	    renderer.render(scene, camera);
	}
	
	function collisionDetection(position) {
	    // Collision detection
	    raycaster.ray.origin.copy(position);
	    // raycaster.ray.origin.y -= 10;
	    var dir = controls.getDirection(new THREE.Vector3(0, 0, 0)).clone();
	    raycaster.ray.direction.copy(dir);

	    var intersections = raycaster.intersectObjects(cubes);

	    // If we hit something (a wall) then stop moving in
	    // that direction
	    if (intersections.length > 0 && intersections[0].distance <= 215) {
	        console.log(intersections.length);
	        controls.isOnObject(true);
	    }
	}

	function addCube(scene, camera, wireFrame, x, y) {

		var geometry = new THREE.BoxGeometry(size, size, size);

		var material = new THREE.MeshLambertMaterial({
			map : THREE.ImageUtils.loadTexture('images/crate.jpg')
		});
		var cube = new THREE.Mesh(geometry, material);
		cube.position.set(x, 10, y);
		scene.add(cube);
		cubes.push(cube);
		return cube;
	}

	function addCubes(scene, camera, wireFrame) {

		$.getJSON("Grid000.json", function(json){
			var max=json.length;
			
			 for (var i = 0; i < max; i++) {
               for (var j = 0; j < max; j++) {
				   console.log(json[j]);
				   console.log(j);
				   if (json[i][j]===1){
					addCube(scene, camera, wireFrame, i*20, j*20);
				}
			  console.log(json[i][j]);
			  console.log(json[j]);
            }
        }
		});
	}

	function addLights() {
		var light = new THREE.DirectionalLight(0xffffff, 1.5);
		light.position.set(1, 1, 1);
		scene.add(light);
		light = new THREE.DirectionalLight(0xffffff, 0.75);
		light.position.set(-1, -0.5, -1);
		scene.add(light);
	}

	function addSphere(scene, camera, wireFrame, x, y) {
		var geometry = new THREE.SphereGeometry(10, 10, 10);
		var material = new THREE.MeshNormalMaterial({
			color : 0x00ffff,
			wireframe : wireFrame
		});

		var sphere = new THREE.Mesh(geometry, material);
		sphere.overdraw = true;
		sphere.position.set(x, 10, y);
		scene.add(sphere);

		return sphere;
	}
	function drawText(controlObject, position){
	     
	     $('#cameraX').html(position.x);
	     $('#cameraY').html(position.y);
	     $('#cameraZ').html(position.z);
	 }

	function onWindowResize() {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(window.innerWidth, window.innerHeight);
	}
	return Control;
});
