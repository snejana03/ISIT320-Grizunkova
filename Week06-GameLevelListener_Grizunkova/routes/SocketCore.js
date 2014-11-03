/**
 * New node file
 */
module.exports = {

    init : function(server) {
        console.log("init called");
        
        var io = require('socket.io').listen(server);
        
        io.sockets.on('connection', function(socket) {
            socket.emit('socket_is_connected_game', 'You are connected!');
            
            socket.on('disconnect', function() {
                console.log('disconnected event');
            });
          
        });
        
    },

};

//server
        
