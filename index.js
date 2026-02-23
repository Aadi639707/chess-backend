const io = require('socket.io')(process.env.PORT || 3000, { cors: { origin: "*" } });

io.on('connection', (socket) => {
    socket.on('joinGame', (gameId) => {
        socket.join(gameId);
        
        // Is room mein kitne log hain wo check karo
        const room = io.sockets.adapter.rooms.get(gameId);
        const count = room ? room.size : 0;
        
        // Dono players ko update bhejo
        io.to(gameId).emit('playerUpdate', count);
    });

    socket.on('move', (data) => {
        socket.to(data.gameId).emit('move', data.move);
    });

    socket.on('disconnecting', () => {
        for (const room of socket.rooms) {
            if (room !== socket.id) {
                const count = (io.sockets.adapter.rooms.get(room)?.size || 1) - 1;
                socket.to(room).emit('playerUpdate', count);
            }
        }
    });
});
          
