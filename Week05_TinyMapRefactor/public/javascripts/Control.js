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
	var msize = 8.5;
	var npcX;
	var npcZ;
	var me;
	

	function Control() {

		init();
		animate();
		$.subscribe('drawMap', utilities.redrawMap);
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

		doPointerLock();

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

		// $.pubish('drawMap',type=maze, core.gridMaze);
		/*
		 * $.subscribe('drawMap', type = "mazePath", function(gridData) { var c =
		 * document.getElementById("myCanvas"); var context =
		 * c.getContext("2d"); for (var i = 0; i < gridData.length; ++i) { for
		 * (var j = 0; j < gridData[0].length; j++) { context.fillStyle =
		 * "#FF0000"; context.fillRect(i, j, i + size, j + size) } } })
		 */
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

		var controlObject = controls.getObject();
		var position = controlObject.position;
		
		var myGridX = Math.floor(position.x/size);
		var myGridZ = Math.floor(position.z/size);
		
		if (particles.isNpc(myGridX, myGridZ))
		{
			particles.NPCs(myGridX, myGridZ, 0);
		}


		$.publish('drawMap', type=me, 'Please redwad mini map');

		drawText(controlObject, position, particles);

		mazepath.collisionDetection(position);

		// Move the camera
		controls.update();
		core.renderer.render(core.scene, core.camera);

		
	}
	
	/*var myObject= new Object();
	
	function redrawMap(){
		
		var controlObject = controls.getObject();
		var position = controlObject.position;
		
		var c = document.getElementById("myCanvas");
		var context = c.getContext("2d");
		context.fillStyle = "#FF0000";
        if(myObject.x != undefined){
        	console.log(myObject.x);
        	context.clearRect(myObject.x, myObject.z, msize, msize);	
        }
		
        context.fillStyle = "#FFFF00";
        var nowX = Math.floor(position.x/size)*msize; 
        var nowZ = Math.floor(position.z/size)*msize; 
        
        if(myObject.x == nowX){
        	console.log(myObject.x);
        	context.clearRect(myObject.x, myObject.z, msize, msize);	
        }
        
		context.fillRect(nowX, nowZ, msize, msize);
		myObject.x = nowX;
		myObject.z = nowZ;
		
		
	}*/

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
	
	
	function drawText(controlObject, position){
			$('#cameraX').html(Math.floor(position.x)/size);
			$('#cameraY').html(Math.floor(position.y)/size);
			$('#cameraZ').html(Math.floor(position.z)/size);
			$('#particleX').html(particles.npcX);
			//$('#particleY').html(y/size);
			$('#particleZ').html(particles.npcZ);
		
		
		
	}

	function onWindowResize() {
		core.camera.aspect = window.innerWidth / window.innerHeight;
		core.camera.updateProjectionMatrix();
		core.renderer.setSize(window.innerWidth, window.innerHeight);
	}
	return Control;
});
