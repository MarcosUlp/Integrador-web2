// src/routes/index.js
const express = require('express');//es necesario llamar al modulo
const router = express.Router();//crea una instancia de enrutador, nos sirve para definir rutas especificas

// Ejemplo de ruta de prueba
router.get('/ping', (req, res) => {//cuando alguien visita mi sitio con metodo get(abir el navegador) se ejecuta la funcion:
  res.json({ message: 'pong' });//req es la solicitud que hace el usuario y res la respuesta
});
//se solicita ping y si responde pong esta todo ok
module.exports = router;
