const fs = require('fs');
const path = require('path');

const rutaArchivo = path.join(__dirname, '../../partidas.json');

function guardarPartida(req, res) {
  const nuevaPartida = req.body;

  // Leer archivo actual
  fs.readFile(rutaArchivo, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Error leyendo archivo' });

    let partidas = [];

    try {
      partidas = JSON.parse(data);
    } catch (e) {
      console.error('Error al parsear JSON:', e);
    }

    // Agregar nueva partida al principio
    partidas.unshift(nuevaPartida);

    // Mantener solo las últimas 20
    if (partidas.length > 20) partidas = partidas.slice(0, 20);

    // Guardar nuevamente
    fs.writeFile(rutaArchivo, JSON.stringify(partidas, null, 2), (err) => {
      if (err) return res.status(500).json({ error: 'Error guardando partida' });
      res.status(200).json({ message: 'Partida guardada' });
    });
  });
}

module.exports = { guardarPartida };
