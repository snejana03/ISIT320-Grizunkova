define([ "Floors", "PointerLockControls", "PointerLockSetup", "Particles",
		"MazePath", "Shapes", "Core", "TinyPubSub","Utilities" ], function(Floors,
		PointerLockControls, PointerLockSetup, Particles, MazePath, Shapes,
		Core, TinyPubSub, utilities) {

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
	//var msize = 8.5;
	var npcX;
	var npcZ;
	var me;
	var myGridX;
	var myGridZ;
	var blockSize = 8.5;
	

	function Control() {

		init();
		animate();
		$.subscribe('drawMap', utilities.redrawMap);
	}

	function init() {
		
		core = new Core();
		
		/*var screenWidth = window.innerWidth / window.innerHeight;
		core.camera = new THREE.PerspectiveCamera(75, screenWidth, 1, 1000);
		core.scene = new THREE.Scene();
		core.scene.fog = new THREE.Fog(0xffffff, 0, 750);*/

		addLights();

		// drawing floor
		var floors = new Floors();
		floors.drawFloor(core.Scene());

		// creating mazepath
		mazepath = new MazePath();
		mazepath.addCubes("Grid000.json", core.Scene(), core.Camera());


		// particles creation
		particles = new Particles();
		particles.initNpc("Npc000.json", core.Scene(), core.Camera());

		doPointerLock();
		
		var c = document.getElementById("myCanvas");
		var ctx = c.getContext("2d");
		ctx.fillStyle = "#00FF00";
		ctx.fillRect(1 * blockSize, 1 * blockSize, blockSize,blockSize);
		
		
		

		raycaster = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(
				0, -1, 0), 0, 10);

		renderer = new THREE.WebGLRenderer({
			antialias : true
		});
		renderer.setClearColor(0xffffff);
		renderer.setSize(window.innerWidth, window.innerHeight);
		document.body.appendChild(renderer.domElement);
		

		window.addEventListener('resize', onWindowResize, false);

		$("#gameData").load("GameData.html");

		$.getJSON("GameData.json", function(json) {
			$("gameJason").html(json[0].Name);
		});
	}

	function doPointerLock() {
		controls = new THREE.PointerLockControls(core.Camera());
		var yawObject = controls.getObject();
		core.Scene().add(yawObject);

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

		var controlObject = controls.getObject();
		var position = controlObject.position;
		
		 myGridX = Math.floor(position.x/size);
		 myGridZ = Math.floor(position.z/size);		
		 
		
		if (particles.isNpc(myGridX, myGridZ))
		{
			particles.NPCs(myGridX, myGridZ, 0);
		}		

		drawText(controlObject, position, particles);

		mazepath.collisionDetection(position);
		
		//$.publish('drawMap',gridData, {type:"me"},'Please redraw mini map');
		//$.publish('drawMap', {type:"me"});
		//$.publish('drawMap', { type: 'me'});

		// Move the camera
		controls.update();
		renderer.render(core.Scene(), core.Camera());

		
	}
	


	function addLights() {
		var light = new THREE.DirectionalLight(0xffffff, 1.5);
		light.position.set(1, 1, 1);
		core.Scene().add(light);
		light = new THREE.DirectionalLight(0xffffff, 0.75);
		light.position.set(-1, -0.5, -1);
		core.Scene().add(light);
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
			$('#cameraX').html(Math.floor(position.x)/size);
			$('#cameraY').html(Math.floor(position.y)/size);
			$('#cameraZ').html(Math.floor(position.z)/size);
			//$('#particleX').html(particles.getNpcX);
			//$('#particleZ').html(particles.getNpcZ);
			$('#particleX').html(myGridX);
			$('#particleZ').html(myGridZ);
		
		
		
	}

	function onWindowResize() {
		core.Camera().aspect = window.innerWidth / window.innerHeight;
		core.Camera().updateProjectionMatrix();
		renderer.setSize(window.innerWidth, window.innerHeight);
	}
	return Control;
});
