var ThreeLine = (function() {

	var camera, scene, renderer;

	function ThreeLine() {
		setup();
		draw();
	}

	function setup() {

		var W = window.innerWidth, H = window.innerHeight;
		renderer = new THREE.WebGLRenderer();
		renderer.setSize(W, H);
		document.body.appendChild(renderer.domElement);

		camera = new THREE.PerspectiveCamera(100, W / H, 1, 10000);
		camera.position.z = 15;

		scene = new THREE.Scene();
		createParticles();
        }
	
	function createParticles() {
        var geometry = new THREE.IcosahedronGeometry(10, 2);
        
        var material = new THREE.PointCloudMaterial({
            color : 0x00AA00,
            size : 0.2
        });
     
        var particleSystem = new THREE.PointCloud(geometry, material);
        particleSystem.position.set(0, 0, 0);
         
        scene.add(particleSystem);
     
    }

	function draw() {

		requestAnimationFrame(draw);

		// experiment with code from the snippets menu here

		renderer.render(scene, camera);

	}

	return ThreeLine;
})();

window.onload = function(){
	var foo=new ThreeLine();
}