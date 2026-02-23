const io = require('socket.io')(process.env.PORT || 3000, {
  cors: { origin: "*" }
});

io.on('connection', (socket) => {
    console.log('User connected');

    socket.on('joinGame', (gameId) => {
        socket.join(gameId);
        console.log(`User joined game: ${gameId}`);
    });

    socket.on('move', (data) => {
        // Data mein move aur gameId dono honge
        socket.to(data.gameId).emit('move', data.move);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});
