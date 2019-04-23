module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log(`Nuevo usuario conectado ${socket.id}`);
        socket.on('coordenadasUsuario', (coordenadas) => {
            console.log(coordenadas);
            socket.broadcast.emit('coordenadasUsuarioNuevo', coordenadas)
        });
    });
}