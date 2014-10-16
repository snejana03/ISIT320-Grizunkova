var send;

window.onload = function() {

    var socket = io.connect('http://localhost');

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

};
