# 🕹️ Proyecto Integrador - Web 2

Proyecto: **Trabajo Práctico Integrador** de la materia **Web 2**. Se trata de una aplicación desarrollada en Node.js que permite registrar partidas con nombre de jugador y puntaje, y visualizar un ranking con las 20 mejores.

────────────────────────────────────────────────────────────────────────────────────────────────────

##  Tecnologías utilizadas

- Node.js
- Express.js
- Nodemon (para desarrollo)
- HTML5 + CSS3
- JSON para almacenamiento persistente

────────────────────────────────────────────────────────────────────────────────────────────────────

##  ¿Qué hace la app?

- Permite ingresar partidas (nombre + puntaje).
- Guarda la información localmente en un archivo `partidas.json`.
- Muestra en pantalla un ranking con las **20 mejores partidas** ordenadas por puntaje.
- Todo funciona sin base de datos, ideal para entornos locales o educativos.

────────────────────────────────────────────────────────────────────────────────────────────────────

##  Estructura del proyecto

📁 Proyecto/
├─>📁public/
   ├─> index.html            # Interfaz principal
   ├─>📁css/
      ├─> style.css              # Estilos de la interfaz
   ├─>📁img/                     
   ├─>📁js/
      ├─> main.js                # Logica del juego y HTML dinamico
├─>📁src/
   ├─>📁controllers
      ├─>GameController.js       # Genera preguntas aleatoreas + 3 opciones
      ├─>PartidaController.js    # Guarda partidas en archivo Json 
   ├─>📁routes
      ├─> index.js               # Define rutas API y Ranking
├─> partidas.json         # Archivo de almacenamiento persistente
├─> package.json          # Dependencias y scripts del proyecto
├─> app.js                # Servidor principal (Express) 

────────────────────────────────────────────────────────────────────────────────────────────────────

##  Cómo ejecutar el proyecto

1. Clonar el repositorio o descargar los archivos.
2. Instalar dependencias:

   npm install

3. Ejecutar el servidor en modo desarrollo:

   npm run dev

4. Abrir el navegador en:

   http://localhost:3000

────────────────────────────────────────────────────────────────────────────────────────────────────

##  Funcionalidad técnica

- El servidor lee y escribe el archivo `partidas.json`.
- Las partidas se ordenan en el backend al mostrar el ranking.
- Se responde a rutas como `/` (interfaz principal) y `/partidas` (historial en formato JSON).

────────────────────────────────────────────────────────────────────────────────────────────────────

##  Almacenamiento
#
El archivo `partidas.json` guarda todas las partidas en formato:
#
```json
[
  {
    "nombre": "Marcos",
    "correctas": 5,
    "incorrectas": 5,
    "puntaje": 17,
    "tiempoTotal": 139520,
    "fecha": "2025-05-03T04:42:50.994Z"
  }
]
```
────────────────────────────────────────────────────────────────────────────────────────────────────

##  Posibles mejoras futuras

- Agregar fecha y hora visibles en el historial.
- Persistir más de 20 partidas y mostrar todas en una página secundaria.
- Agregar validaciones de formulario más robustas.
- Subir a base de datos remota para usarlo desde distintos dispositivos.

────────────────────────────────────────────────────────────────────────────────────────────────────

##  Autor

**Giraudi Marcos** — Trabajo final de Web 2.
