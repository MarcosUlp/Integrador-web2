// app.js
const express = require('express');//importa el modulo express, framwork para crear servidores web en node.js
const app = express();//con esto configuramos rutas, puertos, middlewares
const path = require('path');//importar modulo path de node.js para manejar rutas de archivos en todos los sistemas operativos
const routes = require('./src/routes/index');
const { guardarPartida } = require('./src/controllers/PartidaController');
const PORT = process.env.PORT || 3000;//define el puerto para correr el servidor 3000 va por defecto

// Middlewares
app.use(express.json());//le pide a express que acepte y procese los datos JSON que lleguen en el body
app.use(express.urlencoded({ extended: true }));//permite procesar datos enviados en formularios html

// Servir archivos estáticos del frontend
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
app.use('/api', routes);//asocia todas las rutas definidas en routes bajo el prefijo '/api'


app.use((req, res) => {// app.use:middleware, no especifica ruta, aplica a toda peticion HTTP

    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });
//dirname: directorio actual
//contruye ruta absoluta al archivo 'index.html' dentro del directorio 'public'


  
// Arranque del servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);//inicia el servidor para escuchar en el puerto indicado
});
