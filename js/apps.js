// app.js
const express = require('express');//importa el modulo express, framwork para crear servidores web en node.js
const app = express();//con esto configuramos rutas, puertos, middlewares
const path = require('path');//importar modulo path de node.js para manejar rutas de archivos en todos los sistemas operativos
const routes = require('./src/routes/index');
const PORT = process.env.PORT || 3000;//define el puerto para correr el servidor 3000 va por defecto

// Middlewares
app.use(express.json());//le pide a express que acepte y procese los datos JSON que lleguen en el body
app.use(express.urlencoded({ extended: true }));//permite procesar datos enviados en formularios html

// Servir archivos estáticos del frontend
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
app.use('/api', routes);//asocia todas las rutas definidas en routes bajo el prefijo '/api'

// Fallback
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));//Captura todas las rutas que no coinciden con las anteriores
    //  (* es un comodín) y devuelve el archivo index.html
});

// Arranque del servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);//inicia el servidor para escuchar en el puerto indicado
});
