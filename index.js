
var app = require('express')();  // set up express framework
var http = require('http').Server(app); // get https

var io = require('socket.io')(http);

var left = 'user has left';

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html')
});

io.on('connection', function(socket) {
    console.log('user has connected'); // let us know if user has joined
    socket.on('disconnect', function(){
        console.log('user has left'); // let us know when user leaves
    });
});
io.on('connection', function(socket){
    socket.on('chat message', function(msg){
        console.log('message: ' + msg);
  });
});




io.on('connection', function(socket){
    socket.on('chat message', function(msg){   // emits to other users
        io.emit('chat message', msg);
    socket.on('disconnect', function(msg) {
        socket.broadcast.emit('user has left', 'this is a test');
    });
  });
});




io.emit('on event', {for: 'everyone'});

http.listen(3000, function(){
    console.log('listening on *:3000');  // bind to port 3000
});
