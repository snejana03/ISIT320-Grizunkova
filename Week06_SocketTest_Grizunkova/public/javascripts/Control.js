$(document).ready(function(){
//var socket = io.connect('http://192.168.2.11:30025');
	var socket = io.connect('http://localhost:30025');
	
socket.on('socket_is_connected', function(message) {
       $('#debug').html(message);
});
socket.emit("foobar",{"Foobar" :"Hello"});

});