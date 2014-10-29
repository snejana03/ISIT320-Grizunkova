

var debug = require('debug')('SocketBasics');
var http = require('http');
var app = require('../app');
var socketCore = require('../routes/SocketCore');

app.set('port', process.env.PORT || 30025);

var server = http.createServer(app);

socketCore.init(server);

server.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);
});