// Require
const express = require('express');
const engine = require('ejs-mate');
const path = require('path');
const socketIO = require('socket.io');
const http = require('http');
// Inicializaciones 
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
// CONSTANTES CONF.
const SRV_PORT = 3000;
const SRV_VIEWS = path.join(__dirname, 'views');
// CONSTANTES CONF. - Public
const SRV_PUBLIC = express.static(path.join(__dirname, 'public'));
// CONSTANTES CONF. - Rutas
const SRV_ROUTES = require('./routes/');
// Configuraciones
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', SRV_VIEWS);
app.use(SRV_ROUTES);
app.use(SRV_PUBLIC);

// Sockets
require('./sockets.js')(io);

// Iniciar servidor
server.listen(SRV_PORT)
    .on('listening', () => {
        console.log(`Servidor escuchando en el puerto ${SRV_PORT}`);
    })
    .on('connection', (socket) => {
        console.log(`Conexion establecida ${socket.remoteAddress}.`);
    });
