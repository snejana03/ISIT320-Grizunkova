define([ "Floors", "PointerLockControls", "PointerLockSetup", "Particles",
		"MazePath", "Shapes", "Core", "TinyPubSub","Utilities", "Sockets" ], function(Floors,
		PointerLockControls, PointerLockSetup, Particles, MazePath, Shapes,
		Core, TinyPubSub, utilities, io) {

	var particles;
	var mazepath=[];
	var shapes;
	var core;
	var particleBaseName;
	var animateNpc = true;
	var cube = null;
	var size = 20;
	var cubes = [];
	var eyex = 200;
	var eyez = 300;
	var msize = 8.5;
	var npcX;
	var npcZ;
	var me;
	var myGridX;
	var myGridZ;
	var io;

	function Control() {

		init();
		animate();
		$.subscribe('drawMap', redrawMap);
	}

	function init() {
		
		core = new Core();
		
		var screenWidth = window.innerWidth / window.innerHeight;
		core.camera = new THREE.PerspectiveCamera(75, screenWidth, 1, 1000);
		core.scene = new THREE.Scene();
		core.scene.fog = new THREE.Fog(0xffffff, 0, 750);

		addLights();

		// drawing floor
		var floors = new Floors();
		floors.drawFloor(core.scene);

		// creating mazepath
		mazepath = new MazePath();
		mazepath.addCubes("Grid000.json", core.scene, core.camera);

		// particles creation
		particles = new Particles();
		particles.initNpc("Npc000.json", core.scene, core.camera);
		
		particles.getNpcX=npcX;
		particles.getNpcZ=npcZ;

		doPointerLock();
		
		
		var c = document.getElementById("myCanvas");
		var ctx = c.getContext("2d");
		var blockSize = 8.5;
		ctx.fillStyle = "#00FF00";
		ctx.fillRect(1 * blockSize, 1 * blockSize, blockSize,blockSize);

		raycaster = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(
				0, -1, 0), 0, 10);

		core.renderer = new THREE.WebGLRenderer({
			antialias : true
		});
		core.renderer.setClearColor(0xffffff);
		core.renderer.setSize(window.innerWidth, window.innerHeight);
		document.body.appendChild(core.renderer.domElement);

		window.addEventListener('resize', onWindowResize, false);

		$("#gameData").load("GameData.html");

		$.getJSON("GameData.json", function(json) {
			$("gameJason").html(json[0].Name);
		});

	}

	function doPointerLock() {
		controls = new THREE.PointerLockControls(core.camera);
		var yawObject = controls.getObject();
		core.scene.add(yawObject);

		// Move camera to the 1, 1 position
		yawObject.position.x = size;
		yawObject.position.z = size; 

		var ps = new PointerLockSetup(controls);

	}

	function animate() {
		requestAnimationFrame(animate);
		var xAxis = new THREE.Vector3(1, 0, 0);
		particles.rotateParticlesAroundWorldAxis(0, xAxis, Math.PI / 180,
				animateNpc);
		animateNpc = !animateNpc;

		controls.isOnObject(false);
		
		
		var socket = io.connect('http://127.0.0.1:30025');
		socket.on('socket_is_connected', function(message) {
		       $('#debug').html(message);
		});
			
		socket.emit("socket_listener_connect","Listerner connected");
		
		socket.emit("cameraLocations", {"CorX": myGridX, "CorY": myGridY, "CorZ": myGridZ});
		
		//socket.emit("GreadChanged", {"grid":$.getJSON("Grid000.json")});
		socket.emit("npcLocations", {"positionX": npcX, "positionZ": npcZ});
		
		socket.emit("redrawMap", {"grid":$.getJSON("Grid000.json"),"particles":$.getJSON("Npc000.json")});
		


		var controlObject = controls.getObject();
		var position = controlObject.position;
		
		 myGridX = Math.floor(position.x)/size;
		 myGridY = Math.floor(position.y)/size;
		 myGridZ = Math.floor(position.z)/size;		

		
		if (particles.isNpc(myGridX, myGridZ))
		{
			particles.NPCs(myGridX, myGridZ, 0);
		}		

		

		drawText(controlObject, position, particles);

		mazepath.collisionDetection(position);
		$.publish('drawMap', {type:"me"},'Please redraw mini map');

		// Move the camera
		controls.update();
		core.renderer.render(core.scene, core.camera);

		
	}


	function addLights() {
		var light = new THREE.DirectionalLight(0xffffff, 1.5);
		light.position.set(1, 1, 1);
		core.scene.add(light);
		light = new THREE.DirectionalLight(0xffffff, 0.75);
		light.position.set(-1, -0.5, -1);
		core.scene.add(light);
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
	
	
	function drawText(controlObject, position, particles){
/*			$('#cameraX').html(Math.floor(position.x)/size);
			$('#cameraY').html(Math.floor(position.y)/size);
			$('#cameraZ').html(Math.floor(position.z)/size);
			$('#particleX').html(particles.getNpcX);
			$('#particleZ').html(particles.getNpcZ);*/

	    $('#gameScore').html();
	    $('#gameLevel').html();
	
	}

	function onWindowResize() {
		core.camera.aspect = window.innerWidth / window.innerHeight;
		core.camera.updateProjectionMatrix();
		core.renderer.setSize(window.innerWidth, window.innerHeight);
	}
	return Control;
});
