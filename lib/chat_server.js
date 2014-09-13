var socketio = require('socket.io');

// set handler for event "user sent a message"
function setMsgHandler(socket,room) {
    socket.on("message", function(message) {
        console.log("got message: "+message.text);
        io.to(room).emit("message", message);
    });
}

exports.listen = function(server) {
    io = socketio.listen(server);
    io.sockets.on("connection", function(socket) 
                  {
                    console.log("got connection");
                    socket.on('subscribe', function(data) { 
                        console.log("data.room: "+data.room);
                        setMsgHandler(socket,data.room);
                        socket.join(data.room); 
                      });
                  });

    }
    
    
