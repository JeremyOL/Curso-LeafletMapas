// Creamos la conexion Socket
const socket = io();

// Creamos el mapa en el div que deseamos.
const map = L.map('map-template');
// Asignamos un zoom y punto inicial al mapa.
map.setView([32.622010, -115.462969], 13);
// Creamos el Layer que se le asignara al mapa.
const tileLayer = L.tileLayer('https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});
// Añadimos el Layer al mapa
map.addLayer(tileLayer);

// Solicitamos al navegador nuestra ubicacion
map.locate({ enableHighAccuracy: true });
// Evento al encontrar nuestra ubicacion
map.on('locationfound', (e) => {
    console.log(e);
    // Creamos un marcador para mostrar en el mapa.
    const marker = L.marker(e.latlng);
    // Le asignamos un PopUp al mapa.
    marker.bindPopup('Aqui te encuentras.');
    // Añadimos el marcador al mapa.
    map.addLayer(marker);
    // Emitimos un mensaje con las coordenadas del nuevo usuario.
    socket.emit('coordenadasUsuario', e.latlng);
});
// Realizamos una accion al recibir el evento coordenadasUsuarioNuevo
socket.on('coordenadasUsuarioNuevo', (nCoordenadas) => {
    console.log(nCoordenadas);
    // Creamos un marcador para mostrar en el mapa.
    const marker = L.marker(nCoordenadas);
    // Le asignamos un PopUp al mapa.
    marker.bindPopup('Aqui te encuentras.');
    // Añadimos el marcador al mapa.
    map.addLayer(marker);
});