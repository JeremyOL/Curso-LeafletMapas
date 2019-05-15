//Exportamos todo el js
module.exports = (io) => {
    // Cuando @io recibe el evento 'connection', donde @socket es el cliente conectado
    io.on('connection', (socket) => {
        // Mostramos un log donde mostraremos el ID del cliente conectado
        console.log(`Nuevo usuario conectado ${socket.id}`);
        // Cuando el cliente @socket recibe el evento 'coordenadasUsuario' que viene con el argumento @coordenadas
        socket.on('coordenadasUsuario', (coordenadas) => {
            // Mostramos un log para ver las coordenadas
            console.log(coordenadas);
            // Se emite un broadcast que lanza el evento 'coordenadasUsuarioNuevo' y envia el argumento @coordenadas que recibio anteriormente
            socket.broadcast.emit('coordenadasUsuarioNuevo', coordenadas);
        });
    });
}
