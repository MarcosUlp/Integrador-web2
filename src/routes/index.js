// src/routes/index.js
const express = require('express');//es necesario llamar al modulo
const { generarPregunta } = require('../controllers/GameControllers');
const router = express.Router();//crea una instancia de enrutador, nos sirve para definir rutas especificas
const { guardarPartida } = require('../controllers/PartidaController');
const fs = require('fs'); //file system, permite trabajar con sistema de archivos, leer, escribir, renombrar etc
const path = require('path');//contruye rutas de archivos de manera segura y evita erores de compatibilidad

// Ejemplo de ruta de prueba
router.get('/ping', (req, res) => {//cuando alguien visita mi sitio con metodo get(abir el navegador) se ejecuta la funcion:
  res.json({ message: 'pong' });//req es la solicitud que hace el usuario y res la respuesta
});
//se solicita ping y si responde pong esta todo ok

router.get('/pregunta', generarPregunta);
router.post('/partida', guardarPartida);


//esta ruta es para obtener las ultimas partidas
router.get('/partidas', (req, res)=>{ // req es el requerimiento del cliente, res el objeto respuesta
  const rutaArchivo = path.join(__dirname, '../../partidas.json');//crea ruta absoluta al archivo partidas.json
  fs.readFile(rutaArchivo, 'utf8', (err, data) =>{
    if(err) return res.status(500).json({error: 'error leyendo el archivo'});
    try{
      const partidas = JSON.parse(data);
      res.json(partidas);
    }catch(e){
      res.status(500).json({error: 'error parseando partidas'});
    }
  });
});



module.exports = router;
