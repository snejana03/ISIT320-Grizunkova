define(["Utilities", "Sockets" ], function(utilities, io) {

var send;

function Control() {
	animate();
}

function animate() {
	requestAnimationFrame(animate);
	
	var socket = io.connect('http://127.0.0.1:30025');
	socket.on('socket_is_connected', function(message) {
	    $('#debug').html(message);
	});
	socket.emit("socket_is_connected","You are connected");
	        
	var socketLocal = io.connect('http://127.0.0.1:30026');
	socketLocal.on('socket_listener_connect', function(message) {
	    $('#debugListener').html(message);
	});
	socketLocal.emit("socket_listener_connect","Listener connected");
	
	socket.on("cameraLocations", function(data){
		CorX
		console.log(data.CorX, data.CorY, data.CorZ)
		$('#coordinateX').html(data.CorX);
		$('#coordinateY').html(data.CorY);
		$('#coordinateZ').html(data.CorZ);
		
		
	});
	
	socket.on('npcLocations', function(data){
		console.log(data.positionX, data.positionZ)
		$('#npcx').html(data.positionX);
		$('#npcz').html(data.positionZ);
	});
	
	socket.on('redrawMap', function(data) {
		console.log(data.grid, data.particles);
		utilities.redrawMap(data.grid,data.particles, npcType, type);
		/*var c = document.getElementById("myCanvas");
		var ctx = c.getContext("2d");
		var blockSize = 8;
		iterate(data.grid, function(x, z, npcType) {

			if (npcType === 1) {
				ctx.fillStyle = "#FF0000";
			} else {
				ctx.fillStyle = "#00FF00";
			}
			ctx.fillRect(x * blockSize, z * blockSize, blockSize, blockSize);

		});*/
	});
	

    socket.on('receive', function(message) {
        console.log('received %s', message);
        document.querySelector('.receive').innerText = message;
    });
    
    socket.on('display', function(message) {
        console.log('received %s', message);
        document.querySelector('.display').innerText = message;
    });

    send = function(input) {
        console.log(input.value);
        var value = input.value;
        console.log('sending %s to server', value);
        socket.emit('messageChange', {
            message : value
        });
    };


	
}


   


return Control;
});