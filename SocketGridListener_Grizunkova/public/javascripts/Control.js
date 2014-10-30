$(document).ready(function(){
//var socket = io.connect('http://192.168.2.11:30025');
	var socket = io.connect('http://localhost:30025');
	
socket.on('socket_is_connected', function(message) {
       $('#debug').html(message);
       
});

var iterate = function(gridData, callback) {
    if (gridData) {
        for (var z = 0; z < gridData.length; z++) {
            for (var x = 0; x < gridData[0].length; x++) {
                var npcValue = gridData[z][x];
                callback(x, z, npcValue)
            }
        }
    }
};

socket.on('gridsend', function(data) {
console.log(data.grid);
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var blockSize = 8;
iterate(data.grid, function(x, z, npcType) {

	if (npcType === 1) {
		ctx.fillStyle = "#FF0000";
	} else {
		ctx.fillStyle = "#00FF00";
	}
	ctx.fillRect(x * blockSize, z * blockSize, blockSize, blockSize);

});
});

});

//client


