/**
 * New node file
 */
module.exports = {

    init : function(server) {
        console.log("init called");
        
        var io = require('socket.io').listen(server);
        
        /*io.sockets.on('connection', function(socket) {
            socket.emit('socket_is_connected', 'You are connected!');

            socket.on('foobar', function(data) {
                console.log(data.Foobar);
            });
            
            socket.on('disconnect', function() {
                console.log('disconnected event');
            });
            
            socket.on('GreadChanged', function(data){
            console.log(data.grid.responseJSON);
            });            
        });*/
        
    },

};

//server
        
